// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/sign-up', userController.SignUp);
router.get('/login', userController.LogIn);

module.exports = router;
