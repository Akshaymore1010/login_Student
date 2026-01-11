import mongoose from "mongoose";
const marksSchema = new mongoose.Schema({
    StudentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registrationModel",
        required: true
    },
    Math: {
        type: Number,
        required: true,
        default: 0
    },
    English: {
        type: Number,
        required: true,
        default: 0
    },
    Marathi: {
        type: Number,
        required: true,
        default: 0
    },
    Science: {
        type: Number,
        required: true,
        default: 0
    },
    Hindi: {
        type: Number,
        required: true,
        default: 0
    },
    Drawing: {
        type: Number,
        required: true,
        default: 0
    },
    RowStatus: {
        type: Number,
        default: 0
    }

})
const MarksModel = mongoose.model("Marks", marksSchema);
export default MarksModel;