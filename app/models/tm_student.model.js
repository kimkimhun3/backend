const sql = require("./db.js");

// constructor
const TmStudent = function (tm_student) {
  this.email = tm_student.email;
  this.name = tm_student.name;
  this.attended = tm_student.attended;
  this.iqAttended = tm_student.iqAttended;
  this.iqScore = tm_student.iqScore;
  this.englishAttended = tm_student.englishAttended;
  this.englishScore = tm_student.englishScore;
  this.passed = tm_student.passed;
};

TmStudent.create = (newStudent, result) => {
  sql.query("INSERT INTO tm_students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

TmStudent.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM tm_students WHERE email = ?`, email, (err, res) => {
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

TmStudent.getAll = (result) => {
  sql.query("SELECT * FROM tm_students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

TmStudent.updateByEmail = (email, tm_student, result) => {
  sql.query(
    "UPDATE tm_students SET email = ?, name = ?, attended = ?, iqAttended = ?, iqScore = ?, englishAttended = ?, englishScore = ?, passed = ? WHERE email = ?",
    [
      tm_student.email,
      tm_student.name,
      tm_student.attended,
      tm_student.iqAttended,
      tm_student.iqScore,
      tm_student.englishAttended,
      tm_student.englishScore,
      tm_student.passed,
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
        ...tm_student,
      });
      result(null, { email: email, ...tm_student });
    }
  );
};

TmStudent.remove = (id, result) => {
  sql.query("DELETE FROM tm_students WHERE id = ?", id, (err, res) => {
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

TmStudent.removeAll = (result) => {
  sql.query("DELETE FROM tm_students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} students`);
    result(null, res);
  });
};

module.exports = TmStudent;
