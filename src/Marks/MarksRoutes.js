import express from "express"
import { addMarks, removie, UpdateMarks } from "./MarksController.js";
import { verifyToken } from "../MiddleWare/auth.js";

const router = express.Router();
router.post("/add/:StudentID",verifyToken, addMarks);
router.put("/update/:id", UpdateMarks);
router.put("/removie/:id", removie);



export default router;