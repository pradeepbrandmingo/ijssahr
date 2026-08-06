import { User } from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { SIDEBAR_MENU } from "../config/sidebarConfig.js";

/**
 * @desc Get dynamic collapsible sidebar menu based on logged-in user role
 * @route GET /api/v1/users/sidebar-menu
 * @access Private
 */
export const getSidebarMenu = AsyncHandler(async (req, res) => {
  const userRole = req.user.role;

  const filteredMenu = SIDEBAR_MENU.map((category) => {
    // Filter items allowed for user role
    const items = category.items.filter((item) =>
      item.roles.includes(userRole)
    );

    return {
      category: category.category,
      icon: category.icon || "Folder",
      isStandalone: category.isStandalone || false,
      items,
    };
  }).filter((cat) => cat.items.length > 0);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        filteredMenu,
        "Sidebar menu items fetched successfully"
      )
    );
});

/**
 * @desc Create user account (SuperAdmin creates Employee / Client)
 * @route POST /api/v1/users
 * @access Private (SuperAdmin)
 */
export const createUser = AsyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    designation,
    phone,
    companyName,
    clientCode,
    permissions,
  } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  let finalClientCode = clientCode;
  if (role === "client" && (!finalClientCode || finalClientCode.trim() === "")) {
    const totalClients = await User.countDocuments({ role: "client" });
    finalClientCode = `CL-${String(totalClients + 1).padStart(5, "0")}`;
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    designation: designation || (role === "client" ? "Client" : "Employee"),
    phone: phone || "",
    companyName: companyName || "",
    clientCode: finalClientCode || "",
    permissions: Array.isArray(permissions) ? permissions : [],
    status: "active",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdUser, `${role} account created successfully`)
    );
});

/**
 * @desc Get users by role (employees / clients / superadmin)
 * @route GET /api/v1/users
 * @access Private (SuperAdmin, Employee)
 */
export const getUsers = AsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const { search, role, status } = req.query;

  const query = {};

  if (role) {
    query.role = role;
  }

  if (status) {
    query.status = status;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { designation: { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } },
      { clientCode: { $regex: search, $options: "i" } },
    ];
  }

  const totalUsers = await User.countDocuments(query);
  const users = await User.find(query)
    .select("-password -refreshToken")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        users,
        pagination: {
          total: totalUsers,
          page,
          limit,
          totalPages: Math.ceil(totalUsers / limit),
        },
      },
      "Users fetched successfully"
    )
  );
});

/**
 * @desc Get user by ID
 * @route GET /api/v1/users/:id
 * @access Private
 */
export const getUserById = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User details fetched successfully"));
});

/**
 * @desc Update user account details (supports password update by SuperAdmin)
 * @route PUT /api/v1/users/:id
 * @access Private (SuperAdmin)
 */
export const updateUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    role,
    designation,
    phone,
    companyName,
    clientCode,
    status,
    permissions,
    password,
  } = req.body;

  const targetUser = await User.findById(id);

  if (!targetUser) {
    throw new ApiError(404, "User not found");
  }

  if (targetUser.role === "superadmin" && req.user.role !== "superadmin") {
    throw new ApiError(403, "Only Super Admin can update Super Admin accounts");
  }

  if (name) targetUser.name = name;
  if (role) targetUser.role = role;
  if (designation) targetUser.designation = designation;
  if (phone !== undefined) targetUser.phone = phone;
  if (companyName !== undefined) targetUser.companyName = companyName;
  if (clientCode !== undefined) targetUser.clientCode = clientCode;
  if (status) targetUser.status = status;
  if (permissions) targetUser.permissions = permissions;

  // Handle password change if provided
  if (password && password.trim() !== "") {
    targetUser.password = password; // Trigger Mongoose pre-save bcrypt hash hook
  }

  await targetUser.save();

  const updatedUser = await User.findById(id).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User account updated successfully"));
});

/**
 * @desc Delete user account
 * @route DELETE /api/v1/users/:id
 * @access Private (SuperAdmin)
 */
export const deleteUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user._id.toString() === id) {
    throw new ApiError(400, "You cannot delete your own account");
  }

  const targetUser = await User.findById(id);

  if (!targetUser) {
    throw new ApiError(404, "User not found");
  }

  if (targetUser.role === "superadmin") {
    throw new ApiError(403, "Super Admin accounts cannot be deleted");
  }

  await User.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User account deleted successfully"));
});
