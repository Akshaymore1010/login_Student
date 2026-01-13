import registrationModel from "./RegistrationModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const addUser = async (req, res) => {
    try {
        const { Name, email, username, password, role } = req.body;
        console.log(req.body);
        // if (!["student", "teacher"].includes(role)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid role"
        //     })
        // }

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




