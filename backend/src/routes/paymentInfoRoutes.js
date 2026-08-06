import express from "express";
import {
  getPaymentInfo,
  updatePaymentInfo,
  uploadCopyrightPdf,
} from "../controllers/paymentInfoController.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public route to fetch payment settings & copyright form PDF link
router.get("/", getPaymentInfo);

// Protected SuperAdmin routes
router.put("/", verifyJWT, authorizeRoles("superadmin"), updatePaymentInfo);
router.post(
  "/upload-copyright-pdf",
  verifyJWT,
  authorizeRoles("superadmin"),
  upload.single("pdfFile"),
  uploadCopyrightPdf
);

export default router;
