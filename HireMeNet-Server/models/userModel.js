const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true,enum : ['admin' , 'employee' , 'employer'] }, // 'admin', 'employee', 'employer'
    jobsPosted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    jobsApplied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    token: { type: String },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
