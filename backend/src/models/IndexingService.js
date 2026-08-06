import mongoose from "mongoose";

const indexingServicesSchema = new mongoose.Schema(
  {
    services: [
      {
        name: { type: String, required: true },
        url: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

export const IndexingService = mongoose.model(
  "IndexingService",
  indexingServicesSchema
);
