const express = require("express");
const Contact = require("../models/Contact");
const { dbReady } = require("../config/db");

const router = express.Router();

// POST /api/contact  -> submit a new enquiry (public)
router.post("/", async (req, res) => {
  if (!dbReady()) {
    return res.status(503).json({
      error:
        "Online enquiries aren't connected yet \u2014 please reach out by phone or email for now.",
      dbUnavailable: true,
    });
  }

  try {
    const { name, email, phone, projectType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and message are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const enquiry = await Contact.create({
      name,
      email,
      phone,
      projectType,
      message,
    });

    return res.status(201).json({
      message: "Thank you \u2014 your enquiry has been received. We'll be in touch soon.",
      id: enquiry._id,
    });
  } catch (err) {
    console.error("Error saving enquiry:", err.message);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// GET /api/contact  -> list enquiries (studio-internal use)
// NOTE: this route is intentionally unauthenticated for the MVP.
// Before going fully live, put this behind an admin login / API key
// so enquiry details aren't publicly readable.
router.get("/", async (req, res) => {
  if (!dbReady()) {
    return res.status(503).json({ error: "No database connected yet.", dbUnavailable: true });
  }

  try {
    const enquiries = await Contact.find().sort({ createdAt: -1 });
    return res.json(enquiries);
  } catch (err) {
    console.error("Error fetching enquiries:", err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
