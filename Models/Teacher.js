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

teacherSchema.virtual("userDetails", {
  ref: "User", // اسم موديل المستخدم
  localField: "addedBy", // الحقل المرتبط في المعلم
  foreignField: "_id", // الحقل المرتبط في المستخدم
  justOne: true, // لأننا نريد استرجاع مستخدم واحد فقط
});

teacherSchema.set("toObject", { virtuals: true });
teacherSchema.set("toJSON", { virtuals: true });

function validateCreateNewTeacher(obj) {
  const schema = Joi.object({
    idNumber: Joi.string().required(),
    firstName: Joi.string().required(),
    middleName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthPlace: Joi.string().required(),
    birthDate: Joi.date().required(),
    religion: Joi.string().required(),
    nationality: Joi.string().required(),
    gender: Joi.string().valid("Male", "Female").required(),
    location: Joi.object({
      city: Joi.string().required(),
    }).required(),
    maritalStatus: Joi.string().required(),
    motherName: Joi.string().required(),
    childrenCount: Joi.number().min(0).required(),
    contractDate: Joi.date().required(),
    jobCategory: Joi.string().required(),
    workStatus: Joi.string().required(),
    experienceYears: Joi.number().min(0).required(),
    totalSalary: Joi.number().min(0).required(),
    phone: Joi.string()
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
    religion: Joi.string(),
    nationality: Joi.string(),
    gender: Joi.string().valid("Male", "Female"),
    location: Joi.object({
      city: Joi.string(),
    }),
    maritalStatus: Joi.string(),
    motherName: Joi.string(),
    childrenCount: Joi.number().min(0),
    contractDate: Joi.date(),
    jobCategory: Joi.string(),
    workStatus: Joi.string(),
    experienceYears: Joi.number().min(0),
    totalSalary: Joi.number().min(0),
    phone: Joi.string().pattern(/^[0-9]+$/),
  }).min(1);

  return schema.validate(obj);
}

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = {
  Teacher,
  validateUpdateTeacher,
  validateCreateNewTeacher,
};
