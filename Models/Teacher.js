const { mongoose } = require("mongoose");
const Joi = require("joi");

const teacherSchema = new mongoose.Schema({
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
    city: { type: String, required: true },
  },
  parentPhone: { type: String, required: true },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

teacherSchema.virtual("userDetails", {
  ref: "User",
  localField: "addedBy",
  foreignField: "_id",
  justOne: true,
});

teacherSchema.set("toObject", { virtuals: true });
teacherSchema.set("toJSON", { virtuals: true });

const Teacher = mongoose.model("Teacher", teacherSchema);

function validateCreateNewTeacher(obj) {
  const schema = Joi.object({
    idNumber: Joi.string().required(),
    firstName: Joi.string().required(),
    middleName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthPlace: Joi.string().required(),
    birthDate: Joi.date().required(),
    nationality: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    grade: Joi.string().required(),
    location: Joi.object({
      city: Joi.string().required(),
    }).required(),
    parentPhone: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
  });

  return schema.validate(obj);
}

function validateUpdateTeacher(obj) {
  const schema = Joi.object({
    idNumber: Joi.string(),
    firstName: Joi.string(),
    middleName: Joi.string(),
    lastName: Joi.string(),
    birthPlace: Joi.string(),
    birthDate: Joi.date(),
    nationality: Joi.string(),
    gender: Joi.string().valid("Male", "Female"),
    grade: Joi.string(),
    location: Joi.object({
      city: Joi.string(),
    }),
    parentPhone: Joi.string().pattern(/^[0-9]+$/),
  }).min(1);

  return schema.validate(obj);
}

module.exports = {
  Teacher,
  validateCreateNewTeacher,
  validateUpdateTeacher,
};
