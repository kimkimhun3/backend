const sql = require("./db.js");

// constructor
const SeStudent = function (se_student) {
  this.email = se_student.email;
  this.name = se_student.name;
  this.attended = se_student.attended;
  this.iqAttended = se_student.iqAttended;
  this.iqScore = se_student.iqScore;
  this.mathAttended = se_student.mathAttended;
  this.mathScore = se_student.mathScore;
  this.englishAttended = se_student.englishAttended;
  this.englishScore = se_student.englishScore;
  this.passed = se_student.passed;
};

SeStudent.create = (newStudent, result) => {
  sql.query("INSERT INTO se_students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

SeStudent.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM se_students WHERE email = ?`, email, (err, res) => {
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
  });
};

SeStudent.getAll = (result) => {
  sql.query("SELECT * FROM se_students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

SeStudent.updateByEmail = (email, se_student, result) => {
  sql.query(
    "UPDATE se_students SET email = ?, name = ?, attended = ?, iqAttended = ?, iqScore = ?, mathAttended = ?, mathScore = ?, englishAttended = ?, englishScore = ?, passed = ? WHERE email = ?",
    [
      se_student.email,
      se_student.name,
      se_student.attended,
      se_student.iqAttended,
      se_student.iqScore,
      se_student.mathAttended,
      se_student.mathScore,
      se_student.englishAttended,
      se_student.englishScore,
      se_student.passed,
      email,
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

      console.log("updated student with email: ", {
        email: email,
        ...se_student,
      });
      result(null, { email: email, ...se_student });
    }
  );
};

SeStudent.remove = (id, result) => {
  sql.query("DELETE FROM se_students WHERE id = ?", id, (err, res) => {
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

SeStudent.removeAll = (result) => {
  sql.query("DELETE FROM se_students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} students`);
    result(null, res);
  });
};

module.exports = SeStudent;
