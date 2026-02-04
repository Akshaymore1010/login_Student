import registrationModel from "./RegistrationModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";




export const addUser = async (req, res) => {
    try {
        const { Name, email, username, password, role } = req.body;
        console.log(req.body);


        const exstinguser = await registrationModel.findOne({ userName: username }, { email: email });
        if (exstinguser) {
            return res.status(400).json({
                success: false,
                message: "user allready Exsist!"
            })
        }
        const hashpassword = await bcrypt.hash(password, 10);
        console.log(hashpassword);

        const newUser = new registrationModel({
            Name: Name,
            email: email,
            userName: username,
            password: hashpassword,
            role: role

        })

        const data = await newUser.save();
        console.log(data);

        return res.status(200).json({
            success: true,
            message: "user register Succefully!",
            result: data
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }


}

export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { Name, email, username, password, role } = req.body;
        // if (!role && ["student", "teacher"].includes(role)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid role"
        //     });
        // }
        if (username || email) {
            const exstinguser = await registrationModel.findOne({
                _id: { $ne: id },
                $or: [
                    { userName: username },
                    { email: email }
                ]
            });

            if (exstinguser) {
                return res.status(400).json({
                    success: false,
                    message: "username and email allready present!"
                })
            }
        }
        const updateData = {
            Name,
            email,
            role
        }
        if (username) updateData.username = username;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);

        }
        const updateUser = await registrationModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true },
        )
        if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            result: updateUser
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error!"
        })
    }
}
export const DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await registrationModel.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.RowStatus === 0) {
            user.RowStatus = 1;
            await user.save();

        }

        return res.status(200).json({
            success: true,
            message: "Row status updated successfully",
            result: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Intenal Server Error!"

        })
    }
}
export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const User = await registrationModel.findOne({ userName: username });
        console.log("login USer", User);

        if (!User) {
            return res.status(400).json({
                success: false,
                message: "user name is not found!"
            })
        }
        console.log("password", password);
        console.log("hashpassword", User.password);


        const isMatch = await bcrypt.compare(password, User.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalide Email or password!"
            })
        }

        const token = jwt.sign(
            { id: User._id, email: User.email, role: User.role },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login succefully!",
            token,
            User:
            {
                id: User._id,
                Name: User.Name,
                email: User.email,
                username: User.userName,
                role: User.role
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}
export const logout = (req, res) => {
    const token = req.cookies?.token;
    if (token) {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`User logout${decode.role}`);

    } else {
        console.log("Invalide Token!");

    }
    res.clearCookie("token", {
        httpOnly: true,
        samesite: "strict",

    });
    return res.status(200).json({
        success: true,
        message: "logout Succefully!",


    });
}


// export const forgetpassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         const user = await registrationModel.findOne({ email });
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         const resetToken = crypto.randomBytes(32).toString("hex");

//         user.token = crypto
//             .createHash("sha256")
//             .update(resetToken)
//             .digest("hex");

//         user.expiry = Date.now() + 10 * 60 * 1000;

//         await user.save();

//         res.status(200).json({
//             success: true,
//             message: "Reset token generated",
//             resetToken
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// };


// export const resetpassword = async (req, res) => {
//     try {
//         const { token } = req.params;
//         const { newPassword } = req.body;
//         const hashToken = crypto
//             .createHash("sha256")
//             .update(token)
//             .digest("hex");

//         const user = await registrationModel.findOne({
//             token: hashToken,
//             expiry: { $gt: Date.now() }

//         });
//         console.log("User :", user);

//         // console.log("EMAIL:", email);
//         // console.log("RAW TOKEN:", token);
//         // console.log("HASHED TOKEN:", hashToken);

//         if (!user) {
//             return res.status(400).json({
//                 suceess: false,
//                 message: "user not found!"
//             })
//         }
//         const hashpassword = await bcrypt.hash(newPassword, 10);
//         console.log(hashpassword);

//         user.password = hashpassword;

//         // user.token = undefined;
//         // user.expiry = undefined;

//         const data = await user.save();
//         console.log(data);

//         res.status(200).json({
//             success: true,
//             message: "Password reset successful. You can login now.",
//             result: data

//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }

// }


export const forgetpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await registrationModel.findOne({ email });
        if (!user) {
            console.log("user not found!")
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.otp = otp;
        user.expiry = Date.now() + 10 * 60 * 10000
        const data = await user.save();
        console.log("otp", otp);
        res.status(200).json({
            success: true,
            message: "otp send succesfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

export const resetpassword = async (req, res) => {
    try {
        const { email, otp, newpassword } = req.body;


        const user = await registrationModel.findOne({
            email: email,
            otp: otp,
            expiry: {
                $gt: Date.now()
            }
        });
        console.log("REQUEST BODY:", req.body);
        console.log("Current Time:", Date.now());
        console.log("USER FROM DB:", user);

        if (!user) {
            console.log("invalide Otp!")
            return res.status(400).json({
                success: false,
                message: "Invalide Otp!"
            })
        }

        const hashpassword = await bcrypt.hash(newpassword, 10);
        user.password = hashpassword;
        user.otp = undefined;
        user.expiry = undefined;

        const data = await user.save()

        return res.status(200).json({
            success: true,
            message: "Password reset successful. You can login now.",
            result: data
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }

}

