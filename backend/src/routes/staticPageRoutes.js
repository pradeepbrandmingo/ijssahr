import express from "express";
import {
  getPageByKey,
  getAllPages,
  updatePageByKey,
} from "../controllers/staticPageController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/:pageKey", getPageByKey);

// Protected routes (SuperAdmin)
router.use(verifyJWT);
router.get("/", authorizeRoles("superadmin"), getAllPages);
router.put("/:pageKey", authorizeRoles("superadmin"), updatePageByKey);

export default router;
