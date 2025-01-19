const asyncHandler = require("express-async-handler");
const Teacher = require("../Models/Teacher");

/**
 * @desc Add a new teacher
 * @route POST /api/teachers
 * @access Public
 */
const createNewTeacherCtrl = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    birthDate,
    nationality,
    gender,
    address,
    phone,
    salary,
    yearsOfExperience,
  } = req.body;

  if (!id || !name || !birthDate) {
    res.status(400);
    throw new Error("Please fill all required fields.");
  }

  const teacher = new Teacher({
    id,
    name,
    birthDate,
    nationality,
    gender,
    address,
    phone,
    salary,
    yearsOfExperience,
  });

  const savedTeacher = await teacher.save();
  res.status(201).json(savedTeacher);
});

/**
 *  @desc Get all teachers
 *  @route GET /api/teachers
 *  @access Public
 */
const getAllTeachersCtrl = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.status(200).json(teachers);
});

/**
 *  @desc Get teacher By Id
 *  @route GET /api/teachers/:id
 *  @access Public
 */
const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) return res.status(404).json({ error: "Teacher Not Found" });
  res.status(200).json(teacher);
});

/**
 *
 *  @desc Update a teacher
 *  @route PUT /api/teachers/:id
 *  @access Public
 */
const editTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found.");
  }

  const updatedTeacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedTeacher);
});

/**
 *  @desc Delete a teacher
 *  @route DELETE /api/teachers/:id
 *  @access Public
 */
const deleteTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found.");
  }

  await teacher.remove();
  res.status(200).json({ message: "Teacher deleted." });
});

module.exports = {
  createNewTeacherCtrl,
  getAllTeachersCtrl,
  getTeacherById,
  editTeacherById,
  deleteTeacherById,
};
