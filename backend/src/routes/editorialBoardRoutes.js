import express from "express";
import {
  getEditorialBoard,
  updateEditorialBoard,
  uploadApplicationFormPdf,
} from "../controllers/editorialBoardController.js";
import { verifyJWT, authorizeRoles } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getEditorialBoard);

// SuperAdmin routes
router.put("/", verifyJWT, authorizeRoles("superadmin"), updateEditorialBoard);

router.post(
  "/upload-application-form",
  verifyJWT,
  authorizeRoles("superadmin"),
  upload.single("pdfFile"),
  uploadApplicationFormPdf
);

export default router;
