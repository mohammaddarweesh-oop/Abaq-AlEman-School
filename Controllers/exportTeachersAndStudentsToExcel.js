// const path = require("path");
// const ExcelJS = require("exceljs");
// const { Teacher } = require("../Models/Teacher");
// const { Student } = require("../Models/Student");

// const exportTeachersAndStudentsToExcel = async (req, res) => {
//   try {
//     const workbook = new ExcelJS.Workbook();

//     // إعداد ورقة بيانات المعلمين
//     const teacherSheet = workbook.addWorksheet("Teachers");
//     teacherSheet.columns = [
//       { header: "ID", key: "idNumber", width: 15 },
//       { header: "First Name", key: "firstName", width: 15 },
//       { header: "Middle Name", key: "middleName", width: 15 },
//       { header: "Last Name", key: "lastName", width: 15 },
//       { header: "Birth Place", key: "birthPlace", width: 15 },
//       { header: "Birth Date", key: "birthDate", width: 15 },
//       { header: "Religion", key: "religion", width: 15 },
//       { header: "Nationality", key: "nationality", width: 15 },
//       { header: "Gender", key: "gender", width: 10 },
//       { header: "Location", key: "location", width: 15 },
//       { header: "Marital Status", key: "maritalStatus", width: 15 },
//       { header: "Mother Name", key: "motherName", width: 15 },
//       { header: "Children Count", key: "childrenCount", width: 15 },
//       { header: "Contract Date", key: "contractDate", width: 15 },
//       { header: "Job Category", key: "jobCategory", width: 15 },
//       { header: "Work Status", key: "workStatus", width: 15 },
//       { header: "Experience Years", key: "experienceYears", width: 15 },
//       { header: "Total Salary", key: "totalSalary", width: 15 },
//       { header: "Phone", key: "phone", width: 15 },
//     ];
//     const teachers = await Teacher.find();
//     teachers.forEach((teacher) => {
//       teacherSheet.addRow(teacher.toObject());
//     });

//     // إعداد ورقة بيانات الطلاب
//     const studentSheet = workbook.addWorksheet("Students");
//     studentSheet.columns = [
//       { header: "ID", key: "idNumber", width: 15 },
//       { header: "First Name", key: "firstName", width: 15 },
//       { header: "Last Name", key: "lastName", width: 15 },
//       { header: "Gender", key: "gender", width: 10 },
//       { header: "Birth Date", key: "birthDate", width: 15 },
//       { header: "Nationality", key: "nationality", width: 15 },
//       { header: "Phone", key: "phone", width: 15 },
//       { header: "Enrolled Date", key: "enrolledDate", width: 15 },
//     ];
//     const students = await Student.find();
//     students.forEach((student) => {
//       studentSheet.addRow(student.toObject());
//     });

//     // تحديد مسار الحفظ على الخادم
//     const filePath = path.join(
//       __dirname,
//       "../exports/teachers_and_students.xlsx"
//     );

//     // حفظ الملف على الخادم
//     await workbook.xlsx.writeFile(filePath);

//     // إرسال استجابة تحتوي على مسار الملف
//     res.status(200).json({
//       message: "File exported successfully",
//       filePath,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to export data", error });
//   }
// };

// module.exports = {
//   exportTeachersAndStudentsToExcel,
// };

const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");
const { Teacher } = require("../Models/Teacher");
const { Student } = require("../Models/Student");

const exportTeachersAndStudentsToExcel = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();

    // إعداد ورقة بيانات المعلمين
    const teacherSheet = workbook.addWorksheet("Teachers");
    teacherSheet.columns = [
      { header: "ID", key: "idNumber", width: 15 },
      { header: "First Name", key: "firstName", width: 15 },
      { header: "Middle Name", key: "middleName", width: 15 },
      { header: "Last Name", key: "lastName", width: 15 },
      { header: "Birth Place", key: "birthPlace", width: 15 },
      { header: "Birth Date", key: "birthDate", width: 15 },
      { header: "Religion", key: "religion", width: 15 },
      { header: "Nationality", key: "nationality", width: 15 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Location", key: "location", width: 15 },
      { header: "Marital Status", key: "maritalStatus", width: 15 },
      { header: "Mother Name", key: "motherName", width: 15 },
      { header: "Children Count", key: "childrenCount", width: 15 },
      { header: "Contract Date", key: "contractDate", width: 15 },
      { header: "Job Category", key: "jobCategory", width: 15 },
      { header: "Work Status", key: "workStatus", width: 15 },
      { header: "Experience Years", key: "experienceYears", width: 15 },
      { header: "Total Salary", key: "totalSalary", width: 15 },
      { header: "Phone", key: "phone", width: 15 },
    ];
    const teachers = await Teacher.find();
    teachers.forEach((teacher) => {
      teacherSheet.addRow(teacher.toObject());
    });

    // إعداد ورقة بيانات الطلاب
    const studentSheet = workbook.addWorksheet("Students");
    studentSheet.columns = [
      { header: "ID", key: "idNumber", width: 15 },
      { header: "First Name", key: "firstName", width: 15 },
      { header: "Middle Name", key: "middleName", width: 15 },
      { header: "Last Name", key: "lastName", width: 15 },
      { header: "Birth Place", key: "birthPlace", width: 15 },
      { header: "Birth Date", key: "birthDate", width: 15 },
      { header: "Nationality", key: "nationality", width: 15 },
      { header: "Gender", key: "gender", width: 10 },
      { header: "Grade", key: "grade", width: 10 },
      { header: "City", key: "city", width: 15 },
      { header: "Parent Phone", key: "parentPhone", width: 15 },
    ];

    const students = await Student.find();
    students.forEach((student) => {
      // تحويل بيانات الطالب لتتوافق مع التنسيق المطلوب
      const formattedStudent = {
        idNumber: student.idNumber,
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        birthPlace: student.birthPlace,
        birthDate: student.birthDate.toISOString().split("T")[0], // تحويل التاريخ إلى صيغة yyyy-mm-dd
        nationality: student.nationality,
        gender: student.gender,
        grade: student.grade,
        city: student.location.city,
        parentPhone: student.parentPhone,
      };
      studentSheet.addRow(formattedStudent);
    });

    // تحديد مسار الحفظ
    const exportFolderPath = path.join(__dirname, "../exports");
    const filePath = path.join(exportFolderPath, "teachers_and_students.xlsx");

    // التحقق من وجود المجلد وإنشاؤه إذا لم يكن موجودًا
    if (!fs.existsSync(exportFolderPath)) {
      fs.mkdirSync(exportFolderPath, { recursive: true });
    }

    // حفظ الملف
    await workbook.xlsx.writeFile(filePath);

    // إرسال استجابة
    res.status(200).json({
      message: "File exported successfully",
      filePath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to export data", error });
  }
};

module.exports = {
  exportTeachersAndStudentsToExcel,
};
