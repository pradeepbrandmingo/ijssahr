import express from "express";
import {
  getAboutPageData,
  updateAboutPageData,
} from "../controllers/aboutPageController.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getAboutPageData);

// SuperAdmin route
router.put("/", verifyJWT, authorizeRoles("superadmin"), updateAboutPageData);

export default router;
