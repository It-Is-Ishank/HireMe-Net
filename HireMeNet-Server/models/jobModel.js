const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    companyLogo: { type: String, required: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    salaryType: { type: String, required: true },
    jobLocation: { type: String, required: true },
    postingDate: { type: Date, default: Date.now },
    experienceLevel: { type: String, required: true },
    employmentType: { type: String, required: true },
    description: { type: String, required: true },
    skills: [
      { value: { type: String }, label: { type: String } },
      { _id: false },
    ],
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicants: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        resumeUrl: { type: String },
        applicationDate: { type: Date },
        applicationStatus: {
          type: String,
          enum: ["inProgress", "rejected", "approved"],
        },
      },
    ],
  },
  { versionKey: false }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
