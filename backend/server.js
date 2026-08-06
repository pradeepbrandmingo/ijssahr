import dotenv from "dotenv";
import connectDB from "./src/database/db.js";
import app from "./src/app.js";
import { seedSuperAdmin } from "./src/utils/seedAdmin.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(async () => {
    // Seed initial Super Admin if not present
    await seedSuperAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Mongo DB connection failed !!! ", error);
  });
// Nodemon reloaded with Cloudinary & SMTP env variables
