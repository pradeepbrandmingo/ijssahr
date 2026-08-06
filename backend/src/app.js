import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import manuscriptRoutes from "./routes/manuscriptRoutes.js";
import manuscriptPageRoutes from "./routes/manuscriptPageRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";
import staticPageRoutes from "./routes/staticPageRoutes.js";
import authorInstructionRoutes from "./routes/authorInstructionRoutes.js";
import aimScopeRoutes from "./routes/aimScopeRoutes.js";
import paymentInfoRoutes from "./routes/paymentInfoRoutes.js";
import contactInfoRoutes from "./routes/contactInfoRoutes.js";
import editorialBoardRoutes from "./routes/editorialBoardRoutes.js";
import homePageRoutes from "./routes/homePageRoutes.js";
import aboutPageRoutes from "./routes/aboutPageRoutes.js";
import auditLogRoutes from "./routes/auditLogRoutes.js";
import indexingServiceRoutes from "./routes/indexingServiceRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

// Helmet Security Headers (Protects against XSS, Clickjacking, MIME sniffing)
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// Gzip Compression
app.use(compression());

// Logger
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Production-ready CORS Security Configuration (Dynamically configured from .env)
const configuredOrigins = (process.env.CORS_ORIGIN || process.env.CLIENT_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || configuredOrigins.includes(origin)) {
        return callback(null, true);
      }
      if (process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      return callback(
        new Error("CORS policy violation: Origin not allowed"),
        false
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

// Body Parsers for Manuscript Form Submission
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Static File Serving with HTTP Cache Control Headers (7 days max-age for PDFs & images)
app.use(
  express.static("public", {
    maxAge: "7d",
    etag: true,
  })
);

// Cookie Parser
app.use(cookieParser());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/manuscripts", manuscriptRoutes);
app.use("/api/v1/manuscript-page", manuscriptPageRoutes);
app.use("/api/v1/issues", issueRoutes);
app.use("/api/v1/pages", staticPageRoutes);
app.use("/api/v1/author-instructions", authorInstructionRoutes);
app.use("/api/v1/aim-scope", aimScopeRoutes);
app.use("/api/v1/payment-info", paymentInfoRoutes);
app.use("/api/v1/contact-info", contactInfoRoutes);
app.use("/api/v1/editorial-board", editorialBoardRoutes);
app.use("/api/v1/home-page", homePageRoutes);
app.use("/api/v1/about-page", aboutPageRoutes);
app.use("/api/v1/audit-logs", auditLogRoutes);
app.use("/api/v1/indexing-services", indexingServiceRoutes);

// Root / Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IJSSAHR API Running Successfully",
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
