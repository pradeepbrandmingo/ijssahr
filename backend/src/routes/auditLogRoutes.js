import express from "express";
import { getAuditLogs } from "../controllers/auditLogController.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get Audit Activity Logs (SuperAdmin & Employee)
router.get("/", verifyJWT, authorizeRoles("superadmin", "employee"), getAuditLogs);

export default router;
