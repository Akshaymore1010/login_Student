import express from "express";
const router = express.Router();
import { addUser, DeleteUser, updateUser, Login, logout, forgetpassword, resetpassword } from "./RegistrationController.js";

router.post("/newrUser", addUser);
router.put("/update/:id", updateUser);
router.delete("/removie/:id", DeleteUser);
router.post("/login", Login);
router.post("/logout", logout);
router.post("/forget", forgetpassword);
router.post("/reset-password", resetpassword);



export default router;