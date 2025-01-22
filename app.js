const express = require("express");
const teacherRoutes = require("./Routes/teacherRoutes");
const studentRoutes = require("./Routes/studentRoutes");
const { loginUser, registerUser } = require("./Controllers/authController");
const protect = require("./Middlewares/protect");
require("./config/db");
require("dotenv").config();

const app = express();
const PORT = 3003 || process.env.PORT;

app.use(express.json());

app.post("/api/auth/login", loginUser);
app.post("/api/auth/register", registerUser);

app.use("/api/teachers", protect, teacherRoutes);
app.use("/api/students", protect, studentRoutes);

app.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);
