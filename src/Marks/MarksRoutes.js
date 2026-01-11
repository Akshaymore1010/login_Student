import express from "express"
import { addMarks, removie, UpdateMarks } from "./MarksController.js";

const router = express.Router();
router.post("/add/:StudentID", addMarks);
router.put("/update/:id", UpdateMarks);
router.delete("/removie/:id", removie);


export default router;