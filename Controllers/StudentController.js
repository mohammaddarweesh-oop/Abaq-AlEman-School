const asyncHandler = require("express-async-handler");
const {
  Student,
  validateCreateNewStudent,
  validateUpdateStudent,
} = require("../Models/Student");

/**
 * @desc Add a new students
 * @route POST /api/students
 * @access Public
 */
const createNewStudentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateNewStudent(req.body);
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

  const student = new Student({
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

  const savedStudent = await student.save();
  res.status(201).json(savedStudent);
});

/**
 *  @desc Get all students
 *  @route GET /api/students
 *  @access Public
 */
const getAllStudentsCtrl = asyncHandler(async (req, res) => {
  const student = await Student.find().populate("userDetails");
  res.status(200).json(student);
});

/**
 *  @desc Get student By Id
 *  @route GET /api/students/:id
 *  @access Public
 */
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).populate("userDetails");
  if (!student) return res.status(404).json({ error: "Teacher Not Found" });
  res.status(200).json(student);
});

/**
 *
 *  @desc Update a student
 *  @route PUT /api/students/:id
 *  @access Public
 */
const editStudentById = asyncHandler(async (req, res) => {
  const student = await Teacher.findById(req.params.id);

  const { error } = validateUpdateStudent(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (!student) {
    res.status(404);
    throw new Error("Student not found.");
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedStudent);
});

/**
 *  @desc Delete a student
 *  @route DELETE /api/students/:id
 *  @access Public
 */
const deleteStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error("student not found.");
  }

  await Student.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "student deleted." });
});

module.exports = {
  createNewStudentCtrl,
  getAllStudentsCtrl,
  getStudentById,
  editStudentById,
  deleteStudentById,
};
