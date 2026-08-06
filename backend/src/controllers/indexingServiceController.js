import { IndexingService } from "../models/IndexingService.js";
import { logActivity } from "./auditLogController.js";

const defaultServices = [
  { name: "Index Copernicus", url: "https://journals.indexcopernicus.com" },
  { name: "Scientific Indexing Services", url: "https://www.sindexs.org" },
  { name: "Cite factor", url: "https://www.citefactor.org" },
  { name: "Research Bib", url: "https://www.researchbib.com" },
  { name: "SJIF Journal Rank", url: "https://sjifactor.com" },
];

// @desc    Get Indexing Services links (Public)
// @route   GET /api/v1/indexing-services
export const getIndexingServices = async (req, res, next) => {
  try {
    let doc = await IndexingService.findOne();
    if (!doc) {
      doc = await IndexingService.create({ services: defaultServices });
    }
    res.status(200).json({
      success: true,
      data: doc.services || [],
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update / Manage Indexing Services links (SuperAdmin)
// @route   PUT /api/v1/indexing-services
export const updateIndexingServices = async (req, res, next) => {
  try {
    let doc = await IndexingService.findOne();
    if (!doc) {
      doc = new IndexingService({ services: req.body.services || [] });
    } else {
      doc.services = req.body.services || [];
    }
    await doc.save();

    await logActivity({
      req,
      action: "Updated Indexing Services Menu Links",
      module: "Static Pages",
      details: `Updated ${doc.services.length} indexing service links in MongoDB`,
    });

    res.status(200).json({
      success: true,
      message: "Indexing Services menu updated live successfully!",
      data: doc.services,
    });
  } catch (error) {
    next(error);
  }
};
