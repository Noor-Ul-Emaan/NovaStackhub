// server.js
// Entry point for the Pathway API (Express + MongoDB).
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const progressRoutes = require("./routes/progress");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pathway";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Pathway API running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
