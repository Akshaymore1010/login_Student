import registrationModel from "../Registartion/RegistrationModel.js";
import MarksModel from "./MarksModel.js";


export const addMarks = async (req, res) => {

    try {
        const { math, eng, hindi, marathi, sci, drwaing } = req.body
        const { StudentID } = req.params;
        const exsting = await MarksModel.findOne({ StudentID: StudentID });
        if (exsting) {
            return res.status(401).json({
                success: false,
                message: "Marks allready added!"
            })
        }
        const user = await registrationModel.findById(StudentID);
        if (!user || user.role !== "student") {
            return res.status(400).json({
                message: "Student Not Found!"
            });
        }
        const addMarks = new MarksModel({
            StudentID: StudentID,
            Math: math,
            English: eng,
            Marathi: marathi,
            Science: sci,
            Hindi: hindi,
            Drawing: drwaing
        })
        await addMarks.save();

        return res.status(200).json({
            success: true,
            message: "marks added is succefully!",
            data: addMarks

        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error!"
        })
    }
}

export const UpdateMarks = async (req, res) => {
    try {
        const { math, eng, hindi, marathi, sci, drwaing } = req.body
        const id = req.params.id

        const updateMarks = await MarksModel.findByIdAndUpdate(
            id,
            {
                Math: math,
                English: eng,
                Marathi: marathi,
                Science: sci,
                Hindi: hindi,
                Drawing: drwaing
            },
            { new: true }
        )
        if (!updateMarks) {
            return res.status(404).json({
                success: false,
                message: "Marks record not found!"
            });
        }

        return res.status(200).json({
            success: false,
            message: "Data Update Succefully!",
            data: updateMarks
        })




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",

        })
    }
}

export const removie = async (req, res) => {
    try {
        const { id } = req.params
        const marks = await MarksModel.findById(id);
        if (!marks) {
            return res.status(400).json({
                success: false,
                message: "Marks are not found!"
            })
        }
        if (marks.RowStatus === 0) {
            marks.RowStatus = 1;
            await marks.save();

        }
        return res.status(200).json({
            success: true,
            message: "Row status updated successfully",
            result: marks
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
}

