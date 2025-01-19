const {
  createNewStudentCtrl,
  getAllStudentsCtrl,
  getStudentByIdCtrl,
  editStudentByIdCtrl,
  deleteStudentByIdCtrl,
} = require("./Controllers/StudentController");
const express = require("express");
const router = express.Router();

router.route("/students").post(createNewStudentCtrl).get(getAllStudentsCtrl);

router
  .route("/students/:id")
  .get(getStudentByIdCtrl)
  .put(editStudentByIdCtrl)
  .delete(deleteStudentByIdCtrl);

module.exports = {
  router,
};
