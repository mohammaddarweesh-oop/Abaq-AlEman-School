const asyncHandler = require("express-async-handler");
const {
  validateCreateNewStudent,
  validateUpdateStudent,
  Student,
} = require("../Models/Student");

/**
 *
 *  @desc Add a new student
 *  @route POST /api/students
 *  @access Public
 */
const createNewStudentCtrl = asyncHandler(async (req, res) => {
  const {
    idNumber,
    firstName,
    middleName,
    lastName,
    birthPlace,
    birthDate,
    nationality,
    gender,
    grade,
    location,
    parentPhone,
  } = req.body;

  const { userId } = req; // userId من الطلب

  // التحقق من صحة البيانات
  const { error } = validateCreateNewStudent(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // التحقق من وجود الحقول المطلوبة
  if (
    !idNumber ||
    !firstName ||
    !middleName ||
    !lastName ||
    !birthPlace ||
    !birthDate ||
    !nationality ||
    !gender ||
    !grade ||
    !location?.city ||
    !parentPhone
  ) {
    res.status(400);
    throw new Error("Please fill all required fields.");
  }

  // إنشاء كائن الطالب الجديد
  const student = new Student({
    idNumber,
    firstName,
    middleName,
    lastName,
    birthPlace,
    birthDate,
    nationality,
    gender,
    grade,
    location: {
      city: location.city,
    },
    parentPhone,
    addedBy: userId, // إضافة المستخدم الذي أضاف البيانات
  });

  // حفظ الطالب في قاعدة البيانات
  const savedStudent = await student.save();

  // إرسال استجابة
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
