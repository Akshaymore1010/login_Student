import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
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
        // enum: ["student", "teacher"]
    },
    RowStatus: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    otp: {
        type: Number
    },
    expiry: {
        type: Date
    }
})

const registrationModel = mongoose.model("registrationModel", registrationSchema);
export default registrationModel;