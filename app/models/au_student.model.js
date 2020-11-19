const sql = require("./db.js");

// constructor
const AuStudent = function (au_student) {
  this.email = au_student.email;
  this.name = au_student.name;
  this.attended = au_student.attended;
  this.iqAttended = au_student.iqAttended;
  this.iqScore = au_student.iqScore;
  this.mathAttended = au_student.mathAttended;
  this.mathScore = au_student.mathScore;
  this.artAttended = au_student.artAttended;
  this.artScore = au_student.artScore;
  this.englishAttended = au_student.englishAttended;
  this.englishScore = au_student.englishScore;
  this.passed = au_student.passed;
};

AuStudent.create = (newStudent, result) => {
  sql.query("INSERT INTO au_students SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created student: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

AuStudent.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM au_students WHERE email = ?`, email, (err, res) => {
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

AuStudent.getAll = (result) => {
  sql.query("SELECT * FROM au_students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

AuStudent.updateByEmail = (email, au_student, result) => {
  sql.query(
    "UPDATE au_students SET email = ?, name = ?, attended = ?, iqAttended = ?, iqScore = ?, mathAttended = ?, mathScore = ?, artAttended = ?, artScore = ?, englishAttended = ?, englishScore = ?, passed = ? WHERE email = ?",
    [
      au_student.email,
      au_student.name,
      au_student.attended,
      au_student.iqAttended,
      au_student.iqScore,
      au_student.mathAttended,
      au_student.mathScore,
      au_student.artAttended,
      au_student.artScore,
      au_student.englishAttended,
      au_student.englishScore,
      au_student.passed,
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
        ...au_student,
      });
      result(null, { email: email, ...au_student });
    }
  );
};

AuStudent.remove = (id, result) => {
  sql.query("DELETE FROM au_students WHERE id = ?", id, (err, res) => {
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

AuStudent.removeAll = (result) => {
  sql.query("DELETE FROM au_students", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} students`);
    result(null, res);
  });
};

module.exports = AuStudent;
