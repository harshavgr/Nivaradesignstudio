const express = require("express");
const Portfolio = require("../models/Portfolio");
const { dbReady } = require("../config/db");

const router = express.Router();

// GET /api/portfolio?category=Residential  -> list portfolio items
router.get("/", async (req, res) => {
  if (!dbReady()) {
    // No database connected yet \u2014 return an empty list rather than an
    // error, so the frontend's built-in placeholder projects show instead.
    return res.json([]);
  }

  try {
    const { category } = req.query;
    const filter = category && category !== "All" ? { category } : {};

    const items = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 });
    return res.json(items);
  } catch (err) {
    console.error("Error fetching portfolio:", err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
