const sql = require("./db.js");

// constructor
const Student = function (student) {
  this.email = student.email;
  this.name = student.name;
  this.gender = student.gender;
  this.major = student.major;
  this.dob = student.dob;
  this.identityCard = student.identityCard;
  this.transcript = student.transcript;
  this.phoneNumber = student.phoneNumber;
  this.guardianNumber = student.guardianNumber;
  this.schoolLocation = student.schoolLocation;
  this.educationStatus = student.educationStatus;
  this.currentGrade = student.currentGrade;
  this.currentMajor = student.currentMajor;
  this.university = student.university;
  this.school = student.school;
  this.baciiGrade = student.baciiGrade;
  this.mathGrade = student.mathGrade;
  this.examDate = student.examDate;
  this.examTime = student.examTime;
  this.expiration = student.expiration;
  this.base64Code = student.base64Code;
  this.attended = student.attended;
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

Student.findByBase64Code = (base64Code, result) => {
  sql.query(
    `SELECT * FROM students WHERE base64Code = ?`,
    base64Code,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found student: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Student.getAll = (result) => {
  sql.query("SELECT * FROM students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

Student.updateByBase64Code = (base64Code, student, result) => {
  sql.query(
    "UPDATE students SET email = ?, name = ?, gender = ?, major = ?, dob = ?, identityCard = ?, transcript = ?, phoneNumber = ?, guardianNumber = ?, schoolLocation = ?, educationStatus = ?, currentGrade = ?, currentMajor = ?, university = ?, school = ?, baciiGrade = ?, mathGrade = ?, examDate = ?, examTime = ?, expiration = ?, base64Code = ?, attended = ? WHERE base64Code = ?",
    [
      student.email,
      student.name,
      student.gender,
      student.major,
      student.dob,
      student.identityCard,
      student.transcript,
      student.phoneNumber,
      student.guardianNumber,
      student.schoolLocation,
      student.educationStatus,
      student.currentGrade,
      student.currentMajor,
      student.university,
      student.school,
      student.baciiGrade,
      student.mathGrade,
      student.examDate,
      student.examTime,
      student.expiration,
      student.base64Code,
      student.attended,
      base64Code,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated student with base64Code: ", {
        base64Code: base64Code,
        ...student,
      });
      result(null, { base64Code: base64Code, ...student });
    }
  );
};

Student.remove = (id, result) => {
  sql.query("DELETE FROM students WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student with id: ", id);
    result(null, res);
  });
};

Student.removeAll = (result) => {
  sql.query("DELETE FROM students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} students`);
    result(null, res);
  });
};

module.exports = Student;
