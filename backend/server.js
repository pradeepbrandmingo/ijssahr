import dotenv from "dotenv";
import connectDB from "./src/database/db.js";
import app from "./src/app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Failed:", error);
  });
