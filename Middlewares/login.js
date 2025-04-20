const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { Admin } = require("./models/admin");

// تسجيل الدخول
async function login(req, res) {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).send("Valid Email");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).send("Valid Password");
  }

  const token = jwt.sign(
    { adminId: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.send({ token });
}

function authenticate(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("تحتاج إلى تسجيل الدخول");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // تخزين بيانات المسؤول في الطلب
    next();
  } catch (err) {
    res.status(400).send("رمز التوثيق غير صالح");
  }
}

module.exports = { login, authenticate };
