import { AimScope } from "../models/AimScope.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

/**
 * @desc Get Aims & Scope page content (Public access)
 * @route GET /api/v1/aim-scope
 * @access Public
 */
export const getAimScope = AsyncHandler(async (req, res) => {
  let data = await AimScope.findOne();

  // Seed default structure if no document exists yet
  if (!data) {
    data = await AimScope.create({});
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Aims & Scope content fetched successfully"));
});

/**
 * @desc Update Aims & Scope page content (SuperAdmin access)
 * @route PUT /api/v1/aim-scope
 * @access Private (SuperAdmin)
 */
export const updateAimScope = AsyncHandler(async (req, res) => {
  const updateData = req.body;

  let data = await AimScope.findOne();

  if (!data) {
    data = await AimScope.create(updateData);
  } else {
    data = await AimScope.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Aims & Scope content updated successfully"));
});
