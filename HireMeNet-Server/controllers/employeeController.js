const Job = require('../models/jobModel');
const User = require('../models/userModel');

exports.getJobs = async (req, res) => {
    try {
        // Get all jobs
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.applyForJob = async (req, res) => {
    const { userId } = req._id;
    const { jobId } = req.params._id;

    try {
        // Find the job and update the applicants array
        const job = await Job.findById(jobId);
        job.applicants.push(userId);
        await job.save();

        // Update the employee's jobsApplied array
        const user = await User.findById(userId);
        user.jobsApplied.push(job._id);
        await user.save();

        res.json({ message: 'Applied for the job successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getSingleJob = async (req,res) => {
    const jobId = req.params.id;
    try{
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({message:"No job found with that ID"});
        }
        res.send(job);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server error"})
    }
}

exports.getAppliedJobs = async (req, res) => {
    const { userId } = req.user;
    
    try {
        // Find jobs applied by the employee
        const user = await User.findById(userId).populate('jobsApplied');
        res.json(user.jobsApplied);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};