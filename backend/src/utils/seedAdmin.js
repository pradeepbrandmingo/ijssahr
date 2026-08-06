import { User } from "../models/User.js";

export const seedSuperAdmin = async () => {
  try {
    const defaultEmail = (process.env.DEFAULT_ADMIN_EMAIL || "admin@ijssahr.com").toLowerCase().trim();
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "Admin@123456";

    const adminExists = await User.findOne({ email: defaultEmail });

    if (!adminExists) {
      await User.create({
        name: "Super Admin",
        email: defaultEmail,
        password: defaultPassword,
        role: "superadmin",
        designation: "Chief Administrator",
        status: "active",
        permissions: ["all"],
      });

      console.log(`[SEED] Default Super Admin created -> Email: ${defaultEmail} | Password: ${defaultPassword}`);
    }
  } catch (error) {
    console.error("[SEED ERROR] Super admin seeding failed:", error.message);
  }
};
