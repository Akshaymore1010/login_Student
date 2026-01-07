import registrationModel from "./RegistrationModel.js";
import bcrypt from "bcrypt";


export const addUser = async (req, res) => {
    try {
        const { Name, email, username, password, role } = req.body;
        console.log(req.body);

        const exstinguser = await registrationModel.findOne({ userName: username });
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