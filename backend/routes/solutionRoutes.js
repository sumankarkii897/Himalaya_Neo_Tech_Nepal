import express from "express";
import { createSolution, deleteSolutions, getAllSolutions, getSingleSolution, updateSolutions , getSolutionsByCategoryController, searchSolutionsController} from "../controllers/solutionController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";
const router = express.Router();

router.post("/createSolution",verifyToken,isAdmin,  createSolution);
router.get("/getAllSolutions", getAllSolutions);
router.get("/getSolution/:id", getSingleSolution);
router.put("/updateSolution/:id", verifyToken,isAdmin, updateSolutions);
router.delete("/deleteSolution/:id",verifyToken,isAdmin,  deleteSolutions);
router.get("/category/:category", getSolutionsByCategoryController);
router.get("/search", searchSolutionsController);
export default router;