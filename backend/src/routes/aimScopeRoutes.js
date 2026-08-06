import express from "express";
import {
  getAimScope,
  updateAimScope,
} from "../controllers/aimScopeController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public route for frontend rendering
router.get("/", getAimScope);

// Protected route for SuperAdmin management
router.put("/", verifyJWT, authorizeRoles("superadmin"), updateAimScope);

export default router;
