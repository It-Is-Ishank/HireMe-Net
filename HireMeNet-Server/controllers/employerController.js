// controllers/employerController.js
const Job = require("../models/jobModel");
const User = require("../models/userModel");

exports.postJob = async (req, res) => {
  const {
    userId,
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    experienceLevel,
    employmentType,
    description,
    skills,
  } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new job
    const newJob = new Job({
      companyName,
      jobTitle,
      companyLogo,
      minPrice,
      maxPrice,
      salaryType,
      jobLocation,
      experienceLevel,
      employmentType,
      description,
      skills,
      postedBy: userId,
      applicants: [],
    });

    // Save the job
    await newJob.save();

    // Update the employer's jobsPosted array
    user.jobsPosted.push(newJob._id);
    await user.save();

    res.json({ message: "Job posted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getEmployerJobs = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find jobs posted by the employer
    const jobs = await Job.find({ postedBy: userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSingleJob = async (req, res) => {
  const id = req.params.id;

  try {
    const job = await Job.findById(id);
    console.log(job);
    //res.json(job);
    res.send(job);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateJob = async (req, res) => {
  const jobId = req.params.id; // Corrected
  const updatedData = req.body;
  const userId = req.body.userId; // Add this line

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if the user is the owner of the job
    if (job.postedBy.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized. You are not the owner of this job." });
    }

    // Update the job with the provided data
    Object.assign(job, updatedData);

    // Save the updated job
    await job.save();

    res.json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    // Find the job to be deleted
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const userId = job.postedBy.toString();

    // Check if the user is the owner of the job
    if (userId !== req.body.userId) {
      return res
        .status(403)
        .json({ error: "Unauthorized. You are not the owner of this job." });
    }

    // Remove the job from the user's jobsPosted array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.jobsPosted = user.jobsPosted.filter(
      (jobId) => jobId.toString() !== job._id.toString()
    );

    // Save the updated user
    await user.save();

    // Delete the job
    const newJobs = await Job.deleteOne({ _id: jobId });

    res.json({
      message: "Job deleted successfully",
      jobs: newJobs,
      status: true,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
