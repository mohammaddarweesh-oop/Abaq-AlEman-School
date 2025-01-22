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
      { header: "الرقم الوطني للمعلم", key: "idNumber", width: 15 },
      { header: "الإسم الأول", key: "firstName", width: 15 },
      { header: "إسم الأب", key: "middleName", width: 15 },
      { header: "اسم العائلة", key: "lastName", width: 15 },
      { header: "مكان الولادة", key: "birthPlace", width: 15 },
      { header: "تاريخ الميلاد", key: "birthDate", width: 15 },
      { header: "الجنسية", key: "nationality", width: 15 },
      { header: "الجنس", key: "gender", width: 10 },
      { header: "الدرجة", key: "grade", width: 10 },
      { header: "المدينة", key: "location.city", width: 15 },
      { header: "هاتف ولي الأمر", key: "parentPhone", width: 15 },
      { header: "أضافه بواسطة", key: "addedBy", width: 15 },
    ];

    const teachers = await Teacher.find().populate("userDetails");
    teachers.forEach((teacher) => {
      teacherSheet.addRow({
        idNumber: teacher.idNumber,
        firstName: teacher.firstName,
        middleName: teacher.middleName,
        lastName: teacher.lastName,
        birthPlace: teacher.birthPlace,
        birthDate: teacher.birthDate
          ? teacher.birthDate.toISOString().split("T")[0]
          : "N/A",
        nationality: teacher.nationality,
        gender: teacher.gender,
        grade: teacher.grade,
        "location.city": teacher.location.city,
        parentPhone: teacher.parentPhone,
        addedBy: teacher.userDetails ? teacher.userDetails.username : "N/A",
      });
    });

    // إعداد ورقة بيانات الطلاب
    const studentSheet = workbook.addWorksheet("Students");
    studentSheet.columns = [
      { header: "الرقم الوطني للطالب", key: "idNumber", width: 15 },
      { header: "الإسم الأول", key: "firstName", width: 15 },
      { header: "إسم الأب", key: "middleName", width: 15 },
      { header: "اسم العائلة", key: "lastName", width: 15 },
      { header: "مكان الولادة", key: "birthPlace", width: 15 },
      { header: "تاريخ الميلاد", key: "birthDate", width: 15 },
      { header: "الديانة", key: "religion", width: 15 },
      { header: "الجنسية", key: "nationality", width: 15 },
      { header: "الجنس", key: "gender", width: 10 },
      { header: "المدينة", key: "location.city", width: 15 },
      { header: "الحالة الاجتماعية", key: "maritalStatus", width: 15 },
      { header: "اسم الأم", key: "motherName", width: 15 },
      { header: "عدد أفراد الأسرة", key: "childrenCount", width: 15 },
      { header: "تاريخ العقد", key: "contractDate", width: 15 },
      { header: "الفئة الوظيفية", key: "jobCategory", width: 15 },
      { header: "الحالة الوظيفية", key: "workStatus", width: 15 },
      { header: "سنوات الخبرة", key: "experienceYears", width: 15 },
      { header: "إجمالي الراتب", key: "totalSalary", width: 15 },
      { header: "الهاتف", key: "phone", width: 15 },
      { header: "أضافه بواسطة", key: "addedBy", width: 15 },
    ];

    const students = await Student.find().populate("userDetails");
    students.forEach((student) => {
      studentSheet.addRow({
        idNumber: student.idNumber,
        firstName: student.firstName,
        middleName: student.middleName,
        lastName: student.lastName,
        birthPlace: student.birthPlace,
        birthDate: student.birthDate
          ? student.birthDate.toISOString().split("T")[0]
          : "N/A",
        religion: student.religion,
        nationality: student.nationality,
        gender: student.gender,
        "location.city": student.location.city,
        maritalStatus: student.maritalStatus,
        motherName: student.motherName,
        childrenCount: student.childrenCount,
        contractDate: student.contractDate
          ? student.contractDate.toISOString().split("T")[0]
          : "N/A",
        jobCategory: student.jobCategory,
        workStatus: student.workStatus,
        experienceYears: student.experienceYears,
        totalSalary: student.totalSalary,
        phone: student.phone,
        addedBy: student.userDetails ? student.userDetails.username : "N/A",
      });
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
