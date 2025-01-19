const { mongoose } = require("mongoose");
const joi = require("joi");

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
});

const Teacher = mongoose.model("Teacher", teacherSchema);
