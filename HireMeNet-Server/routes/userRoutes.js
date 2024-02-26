// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//create a user
router.post('/sign-up', userController.SignUp);

//login
router.post('/login', userController.LogIn);


module.exports = router;
