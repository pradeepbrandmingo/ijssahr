import express from "express";
import {
  getHomePageData,
  updateHomePageData,
} from "../controllers/homePageController.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getHomePageData);

// SuperAdmin route
router.put("/", verifyJWT, authorizeRoles("superadmin"), updateHomePageData);

export default router;
