const asyncHandler = require("express-async-handler");
const {
  Teacher,
  validateCreateNewTeacher,
  validateUpdateTeacher,
} = require("../Models/Teacher");

/**
 *
 *  @desc Add a new Teacher
 *  @route POST /api/teachers
 *  @access Public
 */
const createNewTeachertCtrl = asyncHandler(async (req, res) => {
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

  const { userId } = req;

  const { error } = validateCreateNewTeacher(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

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

  const teacher = new Teacher({
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
const getTeacherByIdCtrl = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id).populate("userDetails");
  if (!teacher)
    return res.status(404).json({ error: "Teacher Is Not Defiend" });
  res.status(200).json(teacher);
});

/**
 *
 * @desc Update a teacher
 * @route PUT /api/teachers/:id
 * @access Public
 */
const editTeacherByIdCtrl = asyncHandler(async (req, res) => {
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
 * @desc Delete a teacher
 * @route DELETE /api/teachers/:id
 * @access Public
 */
const deleteTeacherByIdCtrl = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found.");
  }

  await Teacher.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Teacher deleted." });
});

module.exports = {
  createNewTeachertCtrl,
  getAllTeachersCtrl,
  getTeacherByIdCtrl,
  editTeacherByIdCtrl,
  deleteTeacherByIdCtrl,
};
