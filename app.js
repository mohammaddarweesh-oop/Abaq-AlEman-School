const express = require("express");
const studentRoutes = require("./Routes/studentRoutes");
const teacherRoutes = require("./Routes/teacherRoutes");
const authRoute = require("./Routes/authRoutes");
const protect = require("./Middlewares/protect");
const exportRoutes = require("./Routes/exportRoutes");
const helmet = require("helmet");
const cors = require("cors");

require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:3000",  
    "https://abaq-aleman-school.onrender.com"  
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use("/api", authRoute);
app.use("/api", protect, teacherRoutes);
app.use("/api", protect, studentRoutes);
app.use("/api", protect, exportRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () =>
  console.log(`Server Running on http://localhost:${PORT}`)
);
