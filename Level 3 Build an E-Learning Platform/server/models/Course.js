// models/Course.js
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  desc: { type: String, required: true }
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  instructor: { type: String, required: true },
  level: { type: String, required: true },
  desc: { type: String, required: true },
  lessons: [lessonSchema]
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
