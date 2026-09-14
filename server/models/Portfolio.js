const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Design", "Residential", "Commercial"],
      required: true,
    },
    imageUrl: { type: String, required: true },
    description: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
