import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getSidebarMenu,
} from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import {
  createUserValidationRules,
  updateUserValidationRules,
  validate,
} from "../validations/userValidation.js";

const router = Router();

// Protect all routes with JWT Authentication
router.use(verifyJWT);

// Get Sidebar Menu for logged-in user (SuperAdmin / Employee / Client)
router.route("/sidebar-menu").get(getSidebarMenu);

// Admin User Management Routes (SuperAdmin restricted for creating/updating users)
router
  .route("/")
  .post(
    authorizeRoles("superadmin"),
    createUserValidationRules(),
    validate,
    createUser
  )
  .get(authorizeRoles("superadmin", "employee"), getUsers);

router
  .route("/:id")
  .get(authorizeRoles("superadmin", "employee"), getUserById)
  .put(
    authorizeRoles("superadmin"),
    updateUserValidationRules(),
    validate,
    updateUser
  )
  .delete(authorizeRoles("superadmin"), deleteUser);

export default router;
