import express from "express";
const router = express.Router();

import UserRoutes from './src/Registartion/RegistartionRoutes.js'
router.use("/Register", UserRoutes)

import MarksRoutes from "./src/Marks/MarksRoutes.js"
router.use('/marks', MarksRoutes)

export default router;
