const express = require("express");
const teacherRoutes = require("./Routes/teacherRoutes");
const studentRoutes = require("./Routes/studentRoutes");

require("./config/db");
require("dotenv").config();

const app = express();
const PORT = 3003 || process.env.PORT;

app.use(express.json());

app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);

app.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);
