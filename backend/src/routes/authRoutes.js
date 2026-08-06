import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  getProfile,
  updateProfile,
  changeCurrentPassword,
} from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {
  loginValidationRules,
  changePasswordValidationRules,
  validate,
} from "../validations/userValidation.js";

const router = Router();

// Public routes
router.route("/login").post(loginValidationRules(), validate, loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getProfile).put(verifyJWT, updateProfile);
router
  .route("/change-password")
  .post(verifyJWT, changePasswordValidationRules(), validate, changeCurrentPassword);

export default router;
