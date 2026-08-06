import { AuthorInstruction } from "../models/AuthorInstruction.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

/**
 * @desc Get author instructions page content (Public access)
 * @route GET /api/v1/author-instructions
 * @access Public
 */
export const getAuthorInstructions = AsyncHandler(async (req, res) => {
  let instructions = await AuthorInstruction.findOne();

  // If no document exists yet, create default document automatically
  if (!instructions) {
    instructions = await AuthorInstruction.create({});
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        instructions,
        "Author instructions content fetched successfully"
      )
    );
});

/**
 * @desc Update author instructions page content (SuperAdmin access)
 * @route PUT /api/v1/author-instructions
 * @access Private (SuperAdmin)
 */
export const updateAuthorInstructions = AsyncHandler(async (req, res) => {
  const updateData = req.body;

  let instructions = await AuthorInstruction.findOne();

  if (!instructions) {
    instructions = await AuthorInstruction.create(updateData);
  } else {
    instructions = await AuthorInstruction.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, runValidators: true }
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        instructions,
        "Author instructions updated successfully"
      )
    );
});
