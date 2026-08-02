// routes/progress.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing auth token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// GET /api/progress — get the logged-in user's progress across all courses
router.get("/", requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(Object.fromEntries(user.progress));
});

// PUT /api/progress/:courseId — toggle a lesson's completion state
// body: { lessonIndex: number }
router.put("/:courseId", requireAuth, async (req, res) => {
  const { lessonIndex } = req.body;
  if (typeof lessonIndex !== "number") {
    return res.status(400).json({ error: "lessonIndex must be a number" });
  }

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const courseId = req.params.courseId;
  const current = user.progress.get(courseId) || [];
  const updated = current.includes(lessonIndex)
    ? current.filter(i => i !== lessonIndex)
    : [...current, lessonIndex];

  user.progress.set(courseId, updated);
  await user.save();

  res.json({ courseId, completedLessons: updated });
});

module.exports = router;
