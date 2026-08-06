import express from "express";
import {
  getAuthorInstructions,
  updateAuthorInstructions,
} from "../controllers/authorInstructionController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public route for frontend page rendering
router.get("/", getAuthorInstructions);

// Protected route for SuperAdmin management
router.put("/", verifyJWT, authorizeRoles("superadmin"), updateAuthorInstructions);

export default router;
