import express from "express";
const router = express.Router();

import UserRoutes from './src/RegistartionRoutes.js'
router.use("/api", UserRoutes)

export default router;
