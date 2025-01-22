const express = require("express");
const router = express.Router();
const {
  createNewStudentCtrl,
  getAllStudentsCtrl,
  getStudentById,
  editStudentById,
  deleteStudentById,
} = require("../Controllers/StudentController");

router.route("/students").post(createNewStudentCtrl).get(getAllStudentsCtrl);

router
  .route("/students/:id")
  .get(getStudentById)
  .put(editStudentById)
  .delete(deleteStudentById);

module.exports = router;
