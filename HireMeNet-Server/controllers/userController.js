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

    // await user.save();

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
    //get all data from frontend
    const { email, password } = req.body;
    // data validation

    if (!(email && password)) return res.status(400).send("Missing Data");

    //find user from db
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid Email");

    // Initialize token variable outside the if block

    //match the password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user._id,
          fullName : user.fullName,
          role : user.role,
        },
        process.env.TokenKey,
        {
          expiresIn: "3d",
        }
      );
      
      // Since user and token are needed outside, make sure they are declared in an accessible scope.
      // Assuming you've declared let token; at the beginning of the try block.

      //cookie generate
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          role: user.role,
          // You might want to exclude the password even if it's hashed
        },
      });
    } else {
      // If password does not match
      return res.status(401).send("Invalid Password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
