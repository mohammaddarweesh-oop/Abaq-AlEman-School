const asyncHandler = require("express-async-handler");
const {
  Teacher,
  validateCreateNewTeacher,
  validateUpdateTeacher,
} = require("../Models/Teacher");

/**
 * @desc Add a new teacher
 * @route POST /api/teachers
 * @access Public
 */
const createNewTeacherCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateNewTeacher(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const {
    idNumber,
    firstName,
    middleName,
    lastName,
    birthPlace,
    birthDate,
    religion,
    nationality,
    gender,
    location,
    maritalStatus,
    motherName,
    childrenCount,
    contractDate,
    jobCategory,
    workStatus,
    experienceYears,
    totalSalary,
    phone,
  } = req.body;
  const { userId } = req;
  console.log("User Id ======> ", userId);

  const teacher = new Teacher({
    idNumber,
    firstName,
    middleName,
    lastName,
    birthPlace,
    birthDate,
    religion,
    nationality,
    gender,
    location,
    maritalStatus,
    motherName,
    childrenCount,
    contractDate,
    jobCategory,
    workStatus,
    experienceYears,
    totalSalary,
    phone,
    addedBy: userId,
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
  const teachers = await Teacher.find().populate("userDetails");
  res.status(200).json(teachers);
});

/**
 *  @desc Get teacher By Id
 *  @route GET /api/teachers/:id
 *  @access Public
 */
const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id).populate("userDetails");
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

  const { error } = validateUpdateTeacher(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

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

  await Teacher.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Teacher deleted." });
});

module.exports = {
  createNewTeacherCtrl,
  getAllTeachersCtrl,
  getTeacherById,
  editTeacherById,
  deleteTeacherById,
};
