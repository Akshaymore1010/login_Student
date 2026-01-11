import express from "express";
const router = express.Router();
import { addUser, DeleteUser, updateUser, Login } from "./RegistrationController.js";

router.post("/newrUser", addUser);
router.put("/update/:id", updateUser);
router.delete("/removie/:id", DeleteUser);
router.post("/login", Login);



export default router;