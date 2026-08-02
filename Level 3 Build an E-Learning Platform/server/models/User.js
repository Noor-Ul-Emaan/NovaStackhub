// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  // progress: courseId -> array of completed lesson indices
  progress: {
    type: Map,
    of: [Number],
    default: {}
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
