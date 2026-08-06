import express from "express";
import {
  getManuscriptPageDetails,
  updateManuscriptPageDetails,
} from "../controllers/manuscriptPageController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getManuscriptPageDetails);

// Protected route (SuperAdmin)
router.use(verifyJWT);
router.put("/", authorizeRoles("superadmin"), updateManuscriptPageDetails);

export default router;
