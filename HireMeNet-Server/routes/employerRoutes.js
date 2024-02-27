const express = require('express');
const router = express.Router();
//const authMiddleware = require('../middleware/authMiddleware');
const employerController = require('../controllers/employerController');

// Apply middleware to protect routes
//router.use(authMiddleware);

// Your protected routes
router.post('/post-job', employerController.postJob);
router.get('/my-jobs/:id', employerController.getEmployerJobs);
router.get('/get-job/:id', employerController.getSingleJob);
router.patch('/update-job/:id', employerController.updateJob);
//router.get('/applicants/:jobId', employerController.getApplicantsForJob);
//router.post('/manage-applicant/:jobId/:applicantId', employerController.manageApplicant);

module.exports = router;
