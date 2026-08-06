import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload local file to Cloudinary
 * @param {string} localFilePath - Path of temporary file on disk
 * @returns {Promise<{ url: string, public_id: string } | null>}
 */
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Check if Cloudinary configuration is present
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.warn("[CLOUDINARY] Credentials missing in .env, using local file path fallback.");
      return null;
    }

    // Upload to Cloudinary with auto resource type to handle PDF, DOCX, images
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "ijssahr_manuscripts",
    });

    // Remove temporary file from local server after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;
  } catch (error) {
    console.error("[CLOUDINARY ERROR] Upload failed, using local file storage fallback:", error.message);
    // Keep local file intact for fallback storage
    return null;
  }
};
