const User = require('../models/userModel');
const Job = require('../models/jobModel');

exports.getAllUsers = async (req, res) => {
    try {
        // Get all users
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        // Get all jobs
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.manageJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        // Implement your logic for managing jobs (e.g., delete a job)
        const deletedJob = await Job.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Update the user's jobsPosted array to remove the deleted job
        await User.updateMany({}, { $pull: { jobsPosted: jobId } });

        res.json({ message: 'Job managed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
