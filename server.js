const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ Connection error:", err));

// Schema + routes
const studentSchema = new mongoose.Schema({}, { strict: false });
const Student = mongoose.model("Student", studentSchema);

// Get all students
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Add new student
app.post("/students", async (req, res) => {
  const student