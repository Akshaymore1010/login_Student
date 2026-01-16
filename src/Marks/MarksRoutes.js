import express from "express"
import { addMarks, removie, UpdateMarks } from "./MarksController.js";

const router = express.Router();
router.post("/add/:StudentID", addMarks);
router.put("/update/:id", UpdateMarks);
router.put("/removie/:id", removie);


export default router;