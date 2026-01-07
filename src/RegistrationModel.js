import mongoose from "mongoose";

const registrationSchema = mongoose.Schema({
    Name: {
        type: String,
    },
    email: {
        type: String,
    },
    userName: {
        type: String,
    },
    password: {
        type: String,

    },
    role: {
        type: String,
    }
})

const registrationModel = mongoose.model("registrationModel", registrationSchema);
export default registrationModel;