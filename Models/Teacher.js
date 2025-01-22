const { mongoose } = require("mongoose");
const Joi = require("joi");

const teacherSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthPlace: { type: String, required: true },
  birthDate: { type: Date, required: true },
  religion: { type: String, required: true },
  nationality: { type: String, required: true },
  gender: { type: String, required: true },
  location: {
    city: {
      type: String,
      required: true,
    },
  },
  maritalStatus: { type: String, required: true },
  motherName: { type: String, required: true },
  childrenCount: { type: Number, required: true },
  contractDate: { type: Date, required: true },
  jobCategory: { type: String, required: true },
  workStatus: { type: String, required: true },
  experienceYears: { type: Number, required: true },
  totalSalary: { type: Number, required: true },
  phone: { type: String, required: true },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

function validateUpdateTeacher(obj) {
  const schema = Joi.object({
    identifier: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    birthDate: Joi.date(),
    nationality: Joi.string(),
    gender: Joi.string().valid("Male", "Female"),
    address: Joi.string(),
    phone: Joi.string().pattern(/^[0-9]+$/),
    salary: Joi.number().min(0),
    yearsOfExperience: Joi.number().integer().min(0),
    jobCategory: Joi.string(),
  }).min(1);

  return schema.validate(obj);
}

function validateCreateNewTeacher(obj) {
  const schema = Joi.object({
    identifier: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.date().required(),
    nationality: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    address: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
    salary: Joi.number().min(0).required(),
    yearsOfExperience: Joi.number().integer().min(0).required(),
    jobCategory: Joi.string().required(),
  });

  return schema.validate(obj);
}

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = {
  Teacher,
  validateUpdateTeacher,
  validateCreateNewTeacher,
};
