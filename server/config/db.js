const mongoose = require("mongoose");

// Tracks whether we're actually connected, so routes can respond
// gracefully instead of throwing when there's no database yet.
let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "MONGODB_URI is not set \u2014 starting without a database. " +
        "The Contact form and Portfolio API will return a friendly " +
        "'not available yet' response until you add one (see server/.env.example)."
    );
    return;
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error(
      "MongoDB connection failed, continuing without a database:",
      err.message
    );
  }
}

function dbReady() {
  return isConnected;
}

module.exports = connectDB;
module.exports.dbReady = dbReady;
