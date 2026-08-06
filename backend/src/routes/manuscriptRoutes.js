import express from "express";
import {
  getSubmissionPage,
  updateSubmissionPage,
  submitManuscript,
  getAllManuscripts,
  updateManuscriptStatus,
  assignAuthorToManuscript,
  updateArticleId,
  deleteManuscript,
  trackManuscript,
} from "../controllers/manuscriptController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/submission-page", getSubmissionPage);
router.post("/submit", upload.single("file"), submitManuscript);
router.post("/track", trackManuscript);

// Protected routes (SuperAdmin, Employee, Client/Author)
router.use(verifyJWT);
router.put(
  "/submission-page",
  authorizeRoles("superadmin"),
  updateSubmissionPage
);

router.get(
  "/",
  authorizeRoles("superadmin", "employee", "client"),
  getAllManuscripts
);
router.patch(
  "/:id/status",
  authorizeRoles("superadmin", "employee"),
  updateManuscriptStatus
);
router.patch(
  "/:id/assign-author",
  authorizeRoles("superadmin", "employee"),
  assignAuthorToManuscript
);
router.patch(
  "/:id/article-id",
  authorizeRoles("superadmin", "employee"),
  updateArticleId
);
router.delete("/:id", authorizeRoles("superadmin"), deleteManuscript);

export default router;
