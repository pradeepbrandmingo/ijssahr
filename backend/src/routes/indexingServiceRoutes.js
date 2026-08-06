import express from "express";
import {
  getIndexingServices,
  updateIndexingServices,
} from "../controllers/indexingServiceController.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getIndexingServices);
router.put("/", verifyJWT, authorizeRoles("superadmin"), updateIndexingServices);

export default router;
