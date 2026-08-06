import { Issue } from "../models/Issue.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { logActivity } from "./auditLogController.js";

/**
 * Helper to seed default Current Issue & Past Archive Issues if DB is empty
 */
const seedInitialIssuesIfEmpty = async () => {
  const count = await Issue.countDocuments();
  if (count > 0) return;

  console.log("[SEEDING INITIAL ISSUES & ARCHIVES]");

  // 1. Initial Current Issue (Volume 01, Issue 04)
  await Issue.create({
    volume: "Volume 01",
    issue: "Issue 04",
    period: "July–Aug 2026",
    publicationFrequency: "Bimonthly",
    status: "In Processing",
    isCurrent: true,
    articles: [
      {
        articleId: "IJSSAHR-2026-001",
        title:
          "Factors Associated With Inadequate Sexual and Reproductive Health Education Among Adolescents and Its Consequences in Selected Secondary Schools in Douala, Cameroon",
        authors:
          "Christina Mbongueh Mohnchimbare, Fankep Dihewou Alphonse Bertin, Henri Lucien Kamga Fouamno, Uganda",
        subHeading: "Public Health & Social Science",
        pageRange: "01–17",
        pdfUrl: "/uploads/sample-paper-1.pdf",
        fileName: "IJSSAHR_014_Cameroon_Study.pdf",
        abstract:
          "Sexual and reproductive health (SRH) education remains a major public health concern among adolescents, particularly in developing countries where socio-cultural barriers, inadequate school-based programs, and poor parent-child communication limit access to accurate reproductive health information. This study assessed factors associated with inadequate sexual and reproductive health education and its consequences among adolescents in selected secondary schools in Douala, Cameroon. A descriptive cross-sectional study was conducted among 378 adolescents recruited from three secondary schools using a non-probability sampling technique...",
        doi: "https://doi.org/10.1000/ijssahr.2026.04.01",
      },
      {
        articleId: "IJSSAHR-2026-002",
        title:
          "A Microcosm of the Qing's Diplomatic Modernization-Sinibaldo De Mas Y Sanz and Treaty of Chinese Laborers in Cuba",
        authors: "Yang Yang, Spain",
        subHeading: "History & Diplomacy",
        pageRange: "18–33",
        pdfUrl: "/uploads/sample-paper-2.pdf",
        fileName: "IJSSAHR_014_Qing_Diplomacy.pdf",
        abstract:
          "This study explores the diplomatic modernization of the Qing Dynasty during the late 19th century through the lens of the Sino-Spanish Treaty regarding Chinese laborers in Cuba. It highlights the shifting paradigms in Qing foreign policy and the empire's attempt to protect its overseas subjects...",
        doi: "https://doi.org/10.1000/ijssahr.2026.04.02",
      },
      {
        articleId: "IJSSAHR-2026-003",
        title: "A Study on the Nature and Truth of Human Arrogance",
        authors: "JuongMe Lee, Republic of Korea",
        subHeading: "Philosophy & Ethics",
        pageRange: "34–51",
        pdfUrl: "/uploads/sample-paper-3.pdf",
        fileName: "IJSSAHR_014_Human_Arrogance.pdf",
        abstract:
          "Human arrogance is a multifaceted psychological and philosophical phenomenon. This paper delves into the root causes of arrogance, distinguishing it from confidence, and analyzes its impact on interpersonal relationships and societal structures...",
        doi: "https://doi.org/10.1000/ijssahr.2026.04.03",
      },
    ],
  });

  // 2. Archived Issue 03 (May–Jun 2026)
  await Issue.create({
    volume: "Volume 01",
    issue: "Issue 03",
    period: "May–Jun 2026",
    publicationFrequency: "Bimonthly",
    status: "Archived",
    isCurrent: false,
    articles: [
      {
        articleId: "IJSSAHR-2026-003-1",
        title:
          "Hans Sachs and the Birth of Poetic Self-awareness: Autobiography, Criticism, and a Paradigm Shift in Literature",
        authors: "Albrecht Classen, USA",
        subHeading: "Literature & Arts",
        pageRange: "01–13",
        pdfUrl: "/uploads/sample-paper-archive-3.pdf",
        fileName: "IJSSAHR_013_Hans_Sachs.pdf",
        abstract:
          "This paper explores the literary transformation and poetic self-awareness of Hans Sachs through autobiographical analysis and Renaissance criticism.",
        doi: "https://doi.org/10.1000/ijssahr.2026.03.01",
      },
      {
        articleId: "IJSSAHR-2026-003-2",
        title:
          "SOS to Ghana's and ECOWAS' Parliaments for the Promulgation of Victims Protection Act",
        authors: "Ishmael D. Norman, Ghana",
        subHeading: "Law & Governance",
        pageRange: "14–23",
        pdfUrl: "/uploads/sample-paper-archive-3-2.pdf",
        fileName: "IJSSAHR_013_Ghana_Law.pdf",
        abstract:
          "An urgent legislative evaluation and policy proposal advocating for victim protection frameworks in West Africa.",
        doi: "https://doi.org/10.1000/ijssahr.2026.03.02",
      },
    ],
  });

  // 3. Archived Issue 02 (Mar–Apr 2026)
  await Issue.create({
    volume: "Volume 01",
    issue: "Issue 02",
    period: "Mar–Apr 2026",
    publicationFrequency: "Bimonthly",
    status: "Archived",
    isCurrent: false,
    articles: [
      {
        articleId: "IJSSAHR-2026-002-1",
        title:
          "Algorithmic Composition: Artificial Intelligence and Generative Methods in Music",
        authors: "Belikova Viktoriia, USA",
        subHeading: "Music & AI",
        pageRange: "41–46",
        pdfUrl: "/uploads/sample-paper-archive-2.pdf",
        fileName: "IJSSAHR_012_AI_Music.pdf",
        abstract:
          "Investigation into AI-generated musical compositions and the evolution of algorithmic sound synthesis in modern arts.",
        doi: "https://doi.org/10.1000/ijssahr.2026.02.01",
      },
    ],
  });

  // 4. Archived Issue 01 (Jan–Feb 2026)
  await Issue.create({
    volume: "Volume 01",
    issue: "Issue 01",
    period: "Jan–Feb 2026",
    publicationFrequency: "Bimonthly",
    status: "Archived",
    isCurrent: false,
    articles: [
      {
        articleId: "IJSSAHR-2026-001-1",
        title: "Tracing the Concept of Mission in Public Organizations",
        authors: "Dr. Mike Potter, USA",
        subHeading: "Public Administration",
        pageRange: "61–71",
        pdfUrl: "/uploads/sample-paper-archive-1.pdf",
        fileName: "IJSSAHR_011_Public_Org.pdf",
        abstract:
          "An organizational theory paper examining public service orientation, mission statements, and administrative efficacy.",
        doi: "https://doi.org/10.1000/ijssahr.2026.01.01",
      },
    ],
  });
};

/**
 * @desc Get active Current Issue with published articles
 * @route GET /api/v1/issues/current
 * @access Public
 */
export const getCurrentIssue = AsyncHandler(async (req, res) => {
  await seedInitialIssuesIfEmpty();

  let currentIssue = await Issue.findOne({ isCurrent: true });

  if (!currentIssue) {
    currentIssue = await Issue.findOne().sort({ createdAt: -1 });
  }

  if (!currentIssue) {
    throw new ApiError(404, "No active current issue record found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, currentIssue, "Current Issue details fetched successfully"));
});

/**
 * @desc Get all past archived issues (where isCurrent = false)
 * @route GET /api/v1/issues/archive
 * @access Public
 */
export const getArchiveIssues = AsyncHandler(async (req, res) => {
  await seedInitialIssuesIfEmpty();

  const archiveIssues = await Issue.find({ isCurrent: false }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, archiveIssues, "Archive issues fetched successfully"));
});

/**
 * @desc Get single issue details by ID (for archive details view)
 * @route GET /api/v1/issues/:id
 * @access Public
 */
export const getIssueById = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const issue = await Issue.findById(id);

  if (!issue) {
    throw new ApiError(404, "Issue record not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, issue, "Issue details fetched successfully"));
});

/**
 * @desc Get all issues (Admin control panel)
 * @route GET /api/v1/issues
 * @access Private (SuperAdmin, Employee)
 */
export const getAllIssues = AsyncHandler(async (req, res) => {
  await seedInitialIssuesIfEmpty();

  const issues = await Issue.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, issues, "All volumes & issues fetched successfully"));
});

/**
 * @desc Create a new Volume/Issue (Auto-archives previous Current Issue if isCurrent = true)
 * @route POST /api/v1/issues
 * @access Private (SuperAdmin, Employee)
 */
export const createIssue = AsyncHandler(async (req, res) => {
  const { volume, issue, period, publicationFrequency, status, isCurrent } = req.body;

  if (!volume || !issue || !period) {
    throw new ApiError(400, "Volume, Issue, and Period fields are required");
  }

  // If new issue is set as Current, automatically update old current issue to Archived
  if (isCurrent) {
    await Issue.updateMany(
      { isCurrent: true },
      { $set: { isCurrent: false, status: "Archived" } }
    );
  }

  const newIssue = await Issue.create({
    volume: volume.trim(),
    issue: issue.trim(),
    period: period.trim(),
    publicationFrequency: publicationFrequency || "Bimonthly",
    status: status || (isCurrent ? "In Processing" : "Archived"),
    isCurrent: Boolean(isCurrent),
    articles: [],
  });

  await logActivity({
    req,
    action: `Created Issue (${volume}, ${issue})`,
    module: "Issues",
    details: `Created new volume issue: ${volume}, ${issue} (${period})`,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newIssue, `Issue "${volume}, ${issue}" created successfully`));
});

/**
 * @desc Update Volume/Issue metadata
 * @route PUT /api/v1/issues/:id
 * @access Private (SuperAdmin, Employee)
 */
export const updateIssue = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { volume, issue, period, publicationFrequency, status, isCurrent } = req.body;

  const existingIssue = await Issue.findById(id);
  if (!existingIssue) {
    throw new ApiError(404, "Issue record not found");
  }

  if (isCurrent && !existingIssue.isCurrent) {
    await Issue.updateMany(
      { isCurrent: true, _id: { $ne: id } },
      { $set: { isCurrent: false, status: "Archived" } }
    );
  }

  existingIssue.volume = volume || existingIssue.volume;
  existingIssue.issue = issue || existingIssue.issue;
  existingIssue.period = period || existingIssue.period;
  existingIssue.publicationFrequency = publicationFrequency || existingIssue.publicationFrequency;
  existingIssue.status = status || existingIssue.status;
  if (typeof isCurrent === "boolean") {
    existingIssue.isCurrent = isCurrent;
  }

  await existingIssue.save();

  return res
    .status(200)
    .json(new ApiResponse(200, existingIssue, "Issue metadata updated successfully"));
});

/**
 * @desc Set an issue as Current (Auto-archives older current issue)
 * @route PATCH /api/v1/issues/:id/set-current
 * @access Private (SuperAdmin, Employee)
 */
export const setCurrentIssue = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const issueToMakeCurrent = await Issue.findById(id);
  if (!issueToMakeCurrent) {
    throw new ApiError(404, "Issue record not found");
  }

  // Auto-archive all existing current issues
  await Issue.updateMany(
    { _id: { $ne: id } },
    { $set: { isCurrent: false, status: "Archived" } }
  );

  issueToMakeCurrent.isCurrent = true;
  issueToMakeCurrent.status = "In Processing";
  await issueToMakeCurrent.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        issueToMakeCurrent,
        `"${issueToMakeCurrent.volume}, ${issueToMakeCurrent.issue}" is now set as the Current Issue!`
      )
    );
});

/**
 * @desc Add a new published article paper to an issue (Supports File upload & DOI link)
 * @route POST /api/v1/issues/:id/articles
 * @access Private (SuperAdmin, Employee)
 */
export const addArticleToIssue = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { articleId, title, authors, subHeading, pageRange, abstract, doi } = req.body;

  const issue = await Issue.findById(id);
  if (!issue) {
    throw new ApiError(404, "Issue record not found");
  }

  if (!title || !authors || !abstract) {
    throw new ApiError(400, "Title, Authors, and Abstract fields are required");
  }

  let pdfUrl = "";
  let fileName = "Paper.pdf";

  if (req.file) {
    fileName = req.file.originalname;
    try {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse && cloudinaryResponse.secure_url) {
        pdfUrl = cloudinaryResponse.secure_url;
      }
    } catch (err) {
      console.error("[ADD ARTICLE] Cloudinary upload fallback:", err.message);
    }

    if (!pdfUrl) {
      pdfUrl = `/uploads/${req.file.filename}`;
    }
  } else if (req.body.pdfUrl) {
    pdfUrl = req.body.pdfUrl;
  } else {
    throw new ApiError(400, "Attached PDF document file is required");
  }

  // Format DOI link cleanly
  let formattedDoi = doi ? doi.trim() : "";
  if (formattedDoi && !formattedDoi.startsWith("http://") && !formattedDoi.startsWith("https://")) {
    formattedDoi = `https://doi.org/${formattedDoi.replace(/^doi:\s*/i, "")}`;
  }

  const newArticle = {
    articleId: articleId || `IJSSAHR-2026-${String(issue.articles.length + 1).padStart(3, "0")}`,
    title: title.trim(),
    authors: authors.trim(),
    subHeading: subHeading || "",
    pageRange: pageRange || `${String(issue.articles.length * 15 + 1).padStart(2, "0")}-${String((issue.articles.length + 1) * 15).padStart(2, "0")}`,
    pdfUrl,
    fileName,
    abstract: abstract.trim(),
    doi: formattedDoi,
  };

  issue.articles.push(newArticle);
  await issue.save();

  return res
    .status(201)
    .json(new ApiResponse(201, issue, `Article "${title}" added to issue successfully`));
});

/**
 * @desc Update an existing published article paper inside an issue (including DOI link)
 * @route PUT /api/v1/issues/:id/articles/:articleId
 * @access Private (SuperAdmin, Employee)
 */
export const updateArticleInIssue = AsyncHandler(async (req, res) => {
  const { id, articleId } = req.params;
  const { title, authors, subHeading, pageRange, abstract, doi, pdfUrl: bodyPdfUrl } = req.body;

  const issue = await Issue.findById(id);
  if (!issue) {
    throw new ApiError(404, "Issue record not found");
  }

  const targetArticle = issue.articles.id(articleId);
  if (!targetArticle) {
    throw new ApiError(404, "Target article not found inside this issue");
  }

  if (title) targetArticle.title = title.trim();
  if (authors) targetArticle.authors = authors.trim();
  if (subHeading !== undefined) targetArticle.subHeading = subHeading;
  if (pageRange) targetArticle.pageRange = pageRange;
  if (abstract) targetArticle.abstract = abstract.trim();

  if (doi !== undefined) {
    let formattedDoi = doi ? doi.trim() : "";
    if (formattedDoi && !formattedDoi.startsWith("http://") && !formattedDoi.startsWith("https://")) {
      formattedDoi = `https://doi.org/${formattedDoi.replace(/^doi:\s*/i, "")}`;
    }
    targetArticle.doi = formattedDoi;
  }

  if (req.file) {
    targetArticle.fileName = req.file.originalname;
    let newPdfUrl = "";
    try {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (cloudinaryResponse && cloudinaryResponse.secure_url) {
        newPdfUrl = cloudinaryResponse.secure_url;
      }
    } catch (err) {
      console.error("[UPDATE ARTICLE] Cloudinary upload fallback:", err.message);
    }
    if (!newPdfUrl) {
      newPdfUrl = `/uploads/${req.file.filename}`;
    }
    targetArticle.pdfUrl = newPdfUrl;
  } else if (bodyPdfUrl) {
    targetArticle.pdfUrl = bodyPdfUrl;
  }

  await issue.save();

  return res
    .status(200)
    .json(new ApiResponse(200, issue, `Article updated successfully`));
});

/**
 * @desc Delete an article from an issue
 * @route DELETE /api/v1/issues/:id/articles/:articleId
 * @access Private (SuperAdmin, Employee)
 */
export const deleteArticleFromIssue = AsyncHandler(async (req, res) => {
  const { id, articleId } = req.params;

  const issue = await Issue.findById(id);
  if (!issue) {
    throw new ApiError(404, "Issue record not found");
  }

  issue.articles = issue.articles.filter((a) => a._id.toString() !== articleId);
  await issue.save();

  return res
    .status(200)
    .json(new ApiResponse(200, issue, "Article removed from issue successfully"));
});

/**
 * @desc Delete an issue record
 * @route DELETE /api/v1/issues/:id
 * @access Private (SuperAdmin)
 */
export const deleteIssue = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const issue = await Issue.findByIdAndDelete(id);

  if (!issue) {
    throw new ApiError(404, "Issue record not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Issue record deleted successfully"));
});

/**
 * @desc Search published articles across all volumes & issues
 * @route GET /api/v1/issues/search/articles
 * @access Public
 */
export const searchArticles = AsyncHandler(async (req, res) => {
  const { q } = req.query;
  const searchRegex = q ? new RegExp(q.trim(), "i") : null;

  const allIssues = await Issue.find();
  const matchedArticles = [];

  allIssues.forEach((iss) => {
    (iss.articles || []).forEach((art) => {
      if (!searchRegex) {
        matchedArticles.push({ ...art.toObject(), volume: iss.volume, issue: iss.issue, period: iss.period });
      } else {
        const isMatch =
          searchRegex.test(art.title || "") ||
          searchRegex.test(art.authors || "") ||
          searchRegex.test(art.abstract || "") ||
          searchRegex.test(art.articleId || "") ||
          searchRegex.test(art.subHeading || "");

        if (isMatch) {
          matchedArticles.push({ ...art.toObject(), volume: iss.volume, issue: iss.issue, period: iss.period });
        }
      }
    });
  });

  return res
    .status(200)
    .json(new ApiResponse(200, matchedArticles, "Articles search completed"));
});
