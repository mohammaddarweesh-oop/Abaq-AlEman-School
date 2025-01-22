const asyncHandler = require("express-async-handler");
const Student = require("../Models/Student");
const {
  validateCreateNewStudent,
  validateUpdateStudent,
} = require("../Models/Student");
/**
 *
 *  @desc Add a new student
 *  @route POST /api/students
 *  @access Public
 */
const createNewStudentCtrl = asyncHandler(async (req, res) => {
  const { id, name, birthDate, grade, parentContact } = req.body;

  const { error } = validateCreateNewStudent(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (!id || !name || !birthDate || !grade) {
    res.status(400);
    throw new Error("Please fill all required fields.");
  }

  const student = new Student({
    id,
    name,
    birthDate,
    grade,
    parentContact,
    addedBy: req.userId, // إضافة المستخدم الذي أضاف البيانات
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
  const students = await Student.find();
  res.status(200).json(students);
});

/**
 *  @desc Get student By Id
 *  @route GET /api/students/:id
 *  @access Public
 */
const getStudentByIdCtrl = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student)
    return res.status(404).json({ error: "Student Is Not Defiend" });
  res.status(200).json(student);
});

/**
 *
 * @desc Update a student
 * @route PUT /api/students/:id
 * @access Public
 */
const editStudentByIdCtrl = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

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
 * @desc Delete a student
 * @route DELETE /api/students/:id
 * @access Public
 */
const deleteStudentByIdCtrl = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error("Student not found.");
  }

  await student.remove();
  res.status(200).json({ message: "Student deleted." });
});

module.exports = {
  createNewStudentCtrl,
  getAllStudentsCtrl,
  getStudentByIdCtrl,
  editStudentByIdCtrl,
  deleteStudentByIdCtrl,
};
