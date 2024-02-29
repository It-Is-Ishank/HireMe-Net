require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(express.json());

const User = require("../models/userModel");

exports.SignUp = async (req, res) => {
  //get all data from the body
  const { fullName, email, password, role } = req.body;
  console.log(req.body);

  try {
    // check if we got all data
    if (!(fullName && email && password && role)) {
      return res.status(400).send("All Fields required");
    }
    //check if user already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).send("user allready exists with this email");
    }

    // encrypt the password
    const encrypPass = await bcrypt.hash(password, 10);

    // create the user
    const user = await User.create({
      fullName,
      email,
      password: encrypPass,
      role,
    });

    // const token = jwt.sign(
    //   {
    //     id: user._id,
    //     fullName,
    //     role,
    //     email,
    //   },
    //   process.env.TokenKey,
    //   {
    //     expiresIn: "3d",
    //   }
    // );

    // user.token = token;

    await user.save();

    res.json({
      acknowledged: true,
      message: "Signed up successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Data validation...

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid Email");

    const isPassValid = await user.comparePassword(password);

    if (!isPassValid) {
      return res.status(401).send("Invalid Password");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    //const token = user.token; old method

    const options = {
      secure: true,
      httpOnly: true, // Set to true for added security
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        data: {
          user,
          accessToken,
          refreshToken,
        },
        message: "Login Successfull",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// .json(
//   new ApiResponse(
//     200,
//     {
//       loggedInUser,
//       accessToken,
//       refreshToken,
//     },
//     "User logged In successfully"
//   )
// );
// class ApiResponse{
//   constructor(statusCode, data, message="ok"){
//       this.statusCode=statusCode
//       this.data=data
//       this.message=message
//       this.success=statusCode<400 // ok status range (100-399)
//   }
// }
