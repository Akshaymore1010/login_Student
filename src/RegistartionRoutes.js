import express from "express";
const router = express.Router();
import { addUser } from "./RegistrationController.js";

router.post("/newrUser", addUser)

export default router;