// routes/courses.js
const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// GET /api/courses — list all courses (optionally filter by category/search)
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const courses = await Course.find(filter);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/courses/:id — single course with lessons
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/courses — create a course (admin use)
router.post("/", async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
