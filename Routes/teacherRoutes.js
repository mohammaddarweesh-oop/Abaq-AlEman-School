const {
  createNewTeachertCtrl,
  getAllTeachersCtrl,
  getTeacherByIdCtrl,
  editTeacherByIdCtrl,
  deleteTeacherByIdCtrl,
} = require("../Controllers/TeacherController");

const express = require("express");
const router = express.Router();

router.route("/teachers").post(createNewTeachertCtrl).get(getAllTeachersCtrl);

router
  .route("/teachers/:id")
  .get(getTeacherByIdCtrl)
  .put(editTeacherByIdCtrl)
  .delete(deleteTeacherByIdCtrl);

module.exports = router;
