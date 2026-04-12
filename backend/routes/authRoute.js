import express from 'express';
import { login, logout, register, updateRole, profile } from '../controllers/authController.js';
import { isAdmin, verifyToken } from '../middleware/auth.js';
const router =express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/updateRole", verifyToken, isAdmin, updateRole);
router.get("/profile",verifyToken,profile)

export default router;
