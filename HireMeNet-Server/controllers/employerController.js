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
      postedBy: userId,
      applicants: [], // applicants array 
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
  const userId = req.body._id;
  console.log(userId);
  try {
    // Find jobs posted by the employer
    const jobs = await Job.find({ postedBy: userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateJob = async (req, res) => {
  const jobId= req.params;
  const updatedData = req.body;

  try {
    // Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if the user is the owner of the job
    if (job.postedBy.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized. You are not the owner of this job." });
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
