const express = require("express");
const router = express.Router();
//const authMiddleware = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

// Apply middleware to protect routes
//router.use(authMiddleware);

// Your protected routes
router.get("/all-users", adminController.getAllUsers);
router.get("/all-jobs", adminController.getAllJobs);
router.post("/manage-job/:jobId", adminController.manageJob);

module.exports = router;
