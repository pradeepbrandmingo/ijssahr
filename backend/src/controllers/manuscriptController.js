import { Manuscript, ARTICLE_STAGES } from "../models/Manuscript.js";
import { User } from "../models/User.js";
import { StaticPage } from "../models/StaticPage.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendManuscriptEmails } from "../utils/sendEmail.js";
import { logActivity } from "./auditLogController.js";

/**
 * Helper to ensure a Client user has a valid clientCode (e.g. CL-00025)
 */
const ensureClientCode = async (user) => {
  if (user && (!user.clientCode || user.clientCode.trim() === "")) {
    const totalClients = await User.countDocuments({ role: "client" });
    user.clientCode = `CL-${String(totalClients > 0 ? totalClients : 25).padStart(5, "0")}`;
    await user.save();
  }
  return user ? user.clientCode : "";
};

/**
 * @desc Publicly track manuscript stage progress using Article ID or Registered Email
 * @route POST /api/v1/manuscripts/track
 * @access Public
 */
export const trackManuscript = AsyncHandler(async (req, res) => {
  const { articleId, email } = req.body;

  if (!articleId && !email) {
    throw new ApiError(400, "Please enter your Article ID or Registered Email ID to track paper status");
  }

  const queryConditions = [];
  if (articleId) {
    queryConditions.push({ articleId: { $regex: new RegExp(`^${articleId.trim()}$`, "i") } });
  }
  if (email) {
    queryConditions.push({ email: email.trim().toLowerCase() });
  }

  const filter = queryConditions.length > 0 ? { $or: queryConditions } : {};

  const manuscripts = await Manuscript.find(filter).sort({ createdAt: -1 });

  if (!manuscripts || manuscripts.length === 0) {
    throw new ApiError(404, "No manuscript records found matching the provided Article ID or Email");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, manuscripts, "Manuscript tracking status fetched successfully"));
});

/**
 * @desc Get Paper Submission instructions and static page details
 * @route GET /api/v1/manuscripts/submission-page
 * @access Public
 */
export const getSubmissionPage = AsyncHandler(async (req, res) => {
  let pageData = await StaticPage.findOne({ pageKey: "paper-submission" });

  if (!pageData) {
    pageData = await StaticPage.create({
      pageKey: "paper-submission",
      title: "Paper Submission",
      extraFields: {
        submissionEmail: "editor@ijssahr.com",
        journalName:
          "International Journal of Social Science, Arts and Humanities Research",
      },
      content: `When submitting papers for potential publication in the IJSSAHR, please submit an original editable file in one of the (.doc, .pdf) style files. All figures, images, tables, etc., should be embedded into the original file. Detailed instructions on preparing papers for submission can be found in the Template Paper. Further information on the scope of the IJSSAHR is also available upon inquiry of prospective authors. Authors accept the terms of the Honor Code and Plagiarism Statement for Paper Submission, and that the paper is original research contribution with the references properly cited in the manuscript.`,
    });
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        pageData,
        "Paper submission page info fetched successfully"
      )
    );
});

/**
 * @desc Update Paper Submission page instructions (SuperAdmin editable)
 * @route PUT /api/v1/manuscripts/submission-page
 * @access Private (SuperAdmin)
 */
export const updateSubmissionPage = AsyncHandler(async (req, res) => {
  const { title, content, submissionEmail, journalName } = req.body;

  const pageData = await StaticPage.findOneAndUpdate(
    { pageKey: "paper-submission" },
    {
      $set: {
        ...(title && { title }),
        ...(content && { content }),
        extraFields: {
          submissionEmail: submissionEmail || "editor@ijssahr.com",
          journalName:
            journalName ||
            "International Journal of Social Science, Arts and Humanities Research",
        },
      },
    },
    { new: true, upsert: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        pageData,
        "Paper submission page instructions updated successfully"
      )
    );
});

/**
 * @desc Submit new Manuscript paper form (Permanent Article ID + 11-Stage Processing Tracking)
 * @route POST /api/v1/manuscripts/submit
 * @access Public
 */
export const submitManuscript = AsyncHandler(async (req, res) => {
  const {
    titlePrefix,
    authorName,
    email,
    postalAddress,
    country,
    journalName,
    articleType,
    articleTitle,
    abstract,
  } = req.body;

  if (!req.file) {
    throw new ApiError(400, "Attached document file (.doc, .docx, .pdf) is required");
  }

  let fileUrl = "";
  let fileName = req.file.originalname;

  // Upload to Cloudinary if credentials are configured
  try {
    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    if (cloudinaryResponse && cloudinaryResponse.secure_url) {
      fileUrl = cloudinaryResponse.secure_url;
    }
  } catch (error) {
    console.error("[SUBMIT MANUSCRIPT] Cloudinary upload fallback to local storage:", error.message);
  }

  if (!fileUrl) {
    fileUrl = `/uploads/${req.file.filename}`;
  }

  // Auto-generate Permanent Article ID (Format: IJSSAHR-YYYY-XXX)
  const currentYear = new Date().getFullYear();
  const totalCount = await Manuscript.countDocuments();
  const articleId = `IJSSAHR-${currentYear}-${String(totalCount + 1).padStart(3, "0")}`;

  // Check if an Author account with this email already exists
  const existingAuthor = await User.findOne({ email: email.toLowerCase().trim() });
  let assignedClientCode = "";
  if (existingAuthor) {
    assignedClientCode = await ensureClientCode(existingAuthor);
  }

  // Create manuscript document in MongoDB with permanent Article ID & statusHistory
  const newManuscript = await Manuscript.create({
    articleId,
    titlePrefix,
    authorName,
    email: email.toLowerCase().trim(),
    postalAddress,
    country,
    journalName:
      journalName ||
      "International Journal of Social Science, Arts and Humanities Research",
    articleType,
    articleTitle,
    abstract,
    fileUrl,
    fileName,
    author: existingAuthor ? existingAuthor._id : undefined,
    clientCode: assignedClientCode,
    status: "Submitted",
    statusHistory: [{ status: "Submitted", updatedAt: new Date() }],
  });

  // Automatically send 2 emails (1: To Submitter/Author, 2: To Journal/Company)
  sendManuscriptEmails(newManuscript).catch((err) =>
    console.error("[BACKGROUND EMAIL ERROR]", err.message)
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newManuscript,
        `Manuscript submitted successfully! Your Permanent Article ID is: ${articleId}`
      )
    );
});

/**
 * @desc Get manuscripts with Server-Side Pagination (30 per page) & Search/Stage filtering
 * @route GET /api/v1/manuscripts
 * @access Private (SuperAdmin, Employee, Client)
 */
export const getAllManuscripts = AsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 30;
  const skip = (page - 1) * limit;

  const { search, status } = req.query;

  const filter = {};

  // Role-based scoping for Author/Client
  if (req.user && req.user.role === "client") {
    const userConditions = [
      { author: req.user._id },
      { email: req.user.email.toLowerCase().trim() },
    ];
    if (req.user.clientCode) {
      userConditions.push({ clientCode: req.user.clientCode });
    }
    filter.$or = userConditions;
  } else if (req.query.email) {
    filter.email = req.query.email.toLowerCase().trim();
  }

  // Filter by stage status
  if (status && status !== "All") {
    if (status === "In Review Stages") {
      filter.status = { $in: ["Plagiarism Check", "Under Review", "Revision Required"] };
    } else {
      filter.status = status;
    }
  }

  // Search filter
  if (search && search.trim() !== "") {
    const searchRegex = new RegExp(search.trim(), "i");
    const searchConditions = [
      { articleId: searchRegex },
      { authorName: searchRegex },
      { email: searchRegex },
      { articleTitle: searchRegex },
      { country: searchRegex },
      { clientCode: searchRegex },
    ];

    if (filter.$or) {
      filter.$and = [{ $or: filter.$or }, { $or: searchConditions }];
      delete filter.$or;
    } else {
      filter.$or = searchConditions;
    }
  }

  const total = await Manuscript.countDocuments(filter);

  const manuscripts = await Manuscript.find(filter)
    .populate("author", "name email clientCode")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  // Auto-link unlinked manuscripts matching registered Client user emails & ensure clientCode
  const linkedManuscripts = await Promise.all(
    manuscripts.map(async (m) => {
      let matchedUser = m.author;
      if (!matchedUser) {
        matchedUser = await User.findOne({
          email: m.email.toLowerCase().trim(),
        });
      }

      if (matchedUser) {
        const clientCode = await ensureClientCode(matchedUser);
        m.author = matchedUser;
        m.clientCode = clientCode || m.clientCode || "CL-00025";
        await Manuscript.findByIdAndUpdate(m._id, {
          author: matchedUser._id,
          clientCode: m.clientCode,
        });
      }
      return m;
    })
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        manuscripts: linkedManuscripts,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      },
      "Manuscripts list fetched successfully"
    )
  );
});

/**
 * @desc Update manuscript stage (Submitted → Plagiarism Check → Under Review → ... → Published)
 * @route PATCH /api/v1/manuscripts/:id/status
 * @access Private (SuperAdmin, Employee)
 */
export const updateManuscriptStatus = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!ARTICLE_STAGES.includes(status)) {
    throw new ApiError(
      400,
      `Invalid stage provided. Allowed stages: ${ARTICLE_STAGES.join(", ")}`
    );
  }

  const existingManuscript = await Manuscript.findById(id);

  if (!existingManuscript) {
    throw new ApiError(404, "Manuscript submission record not found");
  }

  // Update status & append to statusHistory array for author tracking timeline
  existingManuscript.status = status;
  existingManuscript.statusHistory.push({
    status: status,
    updatedAt: new Date(),
  });

  await existingManuscript.save();

  await logActivity({
    req,
    action: `Changed Stage to "${status}"`,
    module: "Manuscripts",
    details: `Updated stage for Article ID ${existingManuscript.articleId || id} (${existingManuscript.articleTitle})`,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        existingManuscript,
        `Manuscript processing stage updated to "${status}" successfully`
      )
    );
});

/**
 * @desc Assign / Link Author account to Manuscript from dropdown selector
 * @route PATCH /api/v1/manuscripts/:id/assign-author
 * @access Private (SuperAdmin, Employee)
 */
export const assignAuthorToManuscript = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { authorId } = req.body;

  const manuscript = await Manuscript.findById(id);
  if (!manuscript) {
    throw new ApiError(404, "Manuscript record not found");
  }

  if (!authorId) {
    manuscript.author = undefined;
    manuscript.clientCode = "";
    await manuscript.save();
    return res
      .status(200)
      .json(new ApiResponse(200, manuscript, "Author unlinked from manuscript successfully"));
  }

  const authorUser = await User.findById(authorId);
  if (!authorUser) {
    throw new ApiError(404, "Selected Author/Client user account not found");
  }

  const assignedClientCode = await ensureClientCode(authorUser);

  manuscript.author = authorUser._id;
  manuscript.clientCode = assignedClientCode || "CL-00025";
  manuscript.email = authorUser.email || manuscript.email;
  await manuscript.save();
  await manuscript.populate("author", "name email clientCode");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        manuscript,
        `Manuscript successfully assigned to Author ${authorUser.name} (${manuscript.clientCode})`
      )
    );
});

/**
 * @desc Manually edit / set custom Permanent Article ID (e.g. IJSSAHR-2026-001)
 * @route PATCH /api/v1/manuscripts/:id/article-id
 * @access Private (SuperAdmin, Employee)
 */
export const updateArticleId = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { articleId } = req.body;

  if (!articleId || articleId.trim() === "") {
    throw new ApiError(400, "Article ID is required");
  }

  const cleanArticleId = articleId.trim().toUpperCase();

  const manuscript = await Manuscript.findByIdAndUpdate(
    id,
    { articleId: cleanArticleId },
    { new: true }
  ).populate("author", "name email clientCode");

  if (!manuscript) {
    throw new ApiError(404, "Manuscript record not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        manuscript,
        `Article ID updated to "${cleanArticleId}" successfully`
      )
    );
});

/**
 * @desc Delete manuscript record
 * @route DELETE /api/v1/manuscripts/:id
 * @access Private (SuperAdmin)
 */
export const deleteManuscript = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const manuscript = await Manuscript.findByIdAndDelete(id);

  if (!manuscript) {
    throw new ApiError(404, "Manuscript record not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Manuscript submission deleted successfully"));
});
