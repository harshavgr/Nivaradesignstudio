require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

const contactRoutes = require("./routes/contact");
const portfolioRoutes = require("./routes/portfolio");

const app = express();

connectDB();

app.use(express.json({ limit: "50kb" }));

// CORS: allow the configured client origin(s). Falls back to allowing all
// origins in development so `npm run dev` works without extra setup.
const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
  })
);

// Basic rate limiting on the contact form to deter spam/abuse.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "Too many requests. Please try again later." },
});
app.use("/api/contact", contactLimiter);

app.use("/api/contact", contactRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// In production, serve the built React app from Express so the whole
// site can be hosted from a single service if you choose to.
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDist));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Nivara API server running on port ${PORT}`);
});
