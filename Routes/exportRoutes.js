const express = require("express");
const {
  exportTeachersAndStudentsToExcel,
} = require("../Controllers/exportTeachersAndStudentsToExcel");

const router = express.Router();

router.get("/export", exportTeachersAndStudentsToExcel);

module.exports = router;
