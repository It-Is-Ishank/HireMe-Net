const express = require('express');
const router = express.Router();
//const authMiddleware = require('../middleware/authMiddleware');
const employeeController = require('../controllers/employeeController');

// Apply middleware to protect routes
//router.use(authMiddleware);

// Your protected routes
router.get('/jobs', employeeController.getJobs);
router.get('/job/:id',employeeController.getSingleJob);
router.post('/apply/:id', employeeController.applyForJob);
router.get('/applied-jobs', employeeController.getAppliedJobs);

module.exports = router;