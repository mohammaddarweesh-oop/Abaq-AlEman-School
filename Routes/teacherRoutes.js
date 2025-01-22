const express = require("express");
const router = express.Router();
const {
  createNewTeacherCtrl,
  getAllTeachersCtrl,
  getTeacherById,
  deleteTeacherById,
  editTeacherById,
} = require("../Controllers/TeacherController");

router.route("/teachers").post(createNewTeacherCtrl).get(getAllTeachersCtrl);

router
  .route("/teachers/:id")
  .get(getTeacherById)
  .put(editTeacherById)
  .delete(deleteTeacherById);

module.exports = router;
