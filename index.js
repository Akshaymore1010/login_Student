import express from "express";
const router = express.Router();

import UserRoutes from './src/Registartion/RegistartionRoutes.js'
router.use("/api", UserRoutes)

import MarksRoutes from "./src/Marks/MarksRoutes.js"
router.use('/test', MarksRoutes)

export default router;
