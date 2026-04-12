import express from 'express';
const router = express.Router();
import { dashboard } from '../controllers/dashboardController.js';
import { verifyToken,isAdmin } from '../middleware/auth.js';

router.get("/", verifyToken, isAdmin, dashboard);

export default router;