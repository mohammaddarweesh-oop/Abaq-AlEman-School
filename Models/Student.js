const { mongoose } = require("mongoose");
const Joi = require("joi");

const studentSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthPlace: { type: String, required: true },
  birthDate: { type: Date, required: true },
  nationality: { type: String, required: true },
  gender: { type: String, required: true },
  grade: { type: String, required: true },
  location: {
    city: {
      type: String,
      required: true,
    },
  },
  parentPhone: { type: String, required: true },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

function validateCreateNewStudent(obj) {
  const schema = Joi.object({
    identifier: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.date().required(),
    religion: Joi.string().required(),
    nationality: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    location: Joi.object({
      city: Joi.string().required(),
    }).required(),
    maritalStatus: Joi.string().required(),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    jobCategory: Joi.string().required(),
    employmentType: Joi.string().valid("Full-Time", "Part-Time").required(),
    yearsOfExperience: Joi.number().integer().min(0).required(),
    salary: Joi.number().min(0).required(),
  });

  return schema.validate(obj);
}

function validateUpdateStudent(obj) {
  const schema = Joi.object({
    identifier: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    birthDate: Joi.date(),
    religion: Joi.string(),
    nationality: Joi.string(),
    gender: Joi.string().valid("Male", "Female"),
    location: Joi.object({
      city: Joi.string(),
    }),
    maritalStatus: Joi.string(),
    phoneNumber: Joi.string().pattern(/^[0-9]+$/),
    jobCategory: Joi.string(),
    employmentType: Joi.string().valid("Full-Time", "Part-Time"),
    yearsOfExperience: Joi.number().integer().min(0),
    salary: Joi.number().min(0),
  }).min(1); // على الأقل يجب أن يكون هناك حقل واحد تم تحديثه

  return schema.validate(obj);
}

module.exports = {
  Student,
  validateCreateNewStudent,
  validateUpdateStudent,
};
