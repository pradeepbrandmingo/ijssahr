import express from "express";
import {
  getContactInfo,
  updateContactInfo,
} from "../controllers/contactInfoController.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getContactInfo);

// SuperAdmin route
router.put("/", verifyJWT, authorizeRoles("superadmin"), updateContactInfo);

export default router;
