import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware;
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);

app.use(express.json({ limit: "20kb" }));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(cookieParser());

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IJSSAHR API Running Successfully",
  });
});

export default app;
