const express = require("express");
const studentRoutes = require("./Routes/studentRoutes");
const teacherRoutes = require("./Routes/teacherRoutes");
const authRoute = require("./Routes/authRoutes");
const protect = require("./Middlewares/protect");
const exportRoutes = require("./Routes/exportRoutes");
require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.use("/api", authRoute);
app.use("/api", protect, teacherRoutes);
app.use("/api", protect, studentRoutes);
app.use("/api", protect, exportRoutes);

app.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);
