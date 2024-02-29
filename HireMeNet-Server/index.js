// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lgnui9h.mongodb.net/?retryWrites=true&w=majority`
);

// Test MongoDB connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

// Define routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/employer", require("./routes/employerRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
