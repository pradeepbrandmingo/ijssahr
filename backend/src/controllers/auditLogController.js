import { AuditLog } from "../models/AuditLog.js";

/**
 * Helper to log any employee/admin activity automatically
 */
export const logActivity = async ({ req, action, module, details }) => {
  try {
    const user = req.user;
    if (!user) return;

    await AuditLog.create({
      user: user._id,
      userName: user.name || "Admin",
      userEmail: user.email || "",
      userRole: user.role || "employee",
      action,
      module,
      details: details || "",
      ipAddress: req.ip || req.headers["x-forwarded-for"] || "",
    });
  } catch (error) {
    console.error("Failed to record activity log:", error);
  }
};

// @desc    Get all audit activity logs (SuperAdmin / Admin)
// @route   GET /api/v1/audit-logs
export const getAuditLogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search || "";
    const module = req.query.module || "";

    const query = {};
    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: "i" } },
        { userEmail: { $regex: search, $options: "i" } },
        { action: { $regex: search, $options: "i" } },
        { details: { $regex: search, $options: "i" } },
      ];
    }
    if (module) {
      query.module = module;
    }

    const total = await AuditLog.countDocuments(query);
    const logs = await AuditLog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: {
        logs,
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};
