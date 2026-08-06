import express from "express";
import {
  getCurrentIssue,
  getArchiveIssues,
  getIssueById,
  getAllIssues,
  createIssue,
  updateIssue,
  setCurrentIssue,
  addArticleToIssue,
  updateArticleInIssue,
  deleteArticleFromIssue,
  deleteIssue,
  searchArticles,
} from "../controllers/issueController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.get("/search/articles", searchArticles);
router.get("/current", getCurrentIssue);
router.get("/archive", getArchiveIssues);
router.get("/:id", getIssueById);

// Protected routes (SuperAdmin, Employee)
router.use(verifyJWT);
router.get("/", authorizeRoles("superadmin", "employee"), getAllIssues);
router.post("/", authorizeRoles("superadmin", "employee"), createIssue);
router.put("/:id", authorizeRoles("superadmin", "employee"), updateIssue);
router.patch("/:id/set-current", authorizeRoles("superadmin", "employee"), setCurrentIssue);

// Article management inside issues
router.post(
  "/:id/articles",
  authorizeRoles("superadmin", "employee"),
  upload.single("file"),
  addArticleToIssue
);
router.put(
  "/:id/articles/:articleId",
  authorizeRoles("superadmin", "employee"),
  upload.single("file"),
  updateArticleInIssue
);
router.delete(
  "/:id/articles/:articleId",
  authorizeRoles("superadmin", "employee"),
  deleteArticleFromIssue
);
router.delete("/:id", authorizeRoles("superadmin"), deleteIssue);

export default router;
