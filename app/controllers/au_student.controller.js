const AuStudent = require("../models/au_student.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const au_student = new AuStudent({
    email: req.body.email,
    name: req.body.name,
    attended: req.body.attended,
    iqAttended: req.body.iqAttended,
    iqScore: req.body.iqScore,
    mathAttended: req.body.mathAttended,
    mathScore: req.body.mathScore,
    artAttended: req.body.artAttended,
    artScore: req.body.artScore,
    englishAttended: req.body.englishAttended,
    englishScore: req.body.englishScore,
    passed: req.body.passed,
  });

  AuStudent.create(au_student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  AuStudent.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  AuStudent.findByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with email ${req.params.email}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Student with email " + req.params.email,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  AuStudent.updateByEmail(
    req.params.email,
    new AuStudent(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with email ${req.params.email}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Student with email " + req.params.email,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  AuStudent.remove(req.params.studentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.studentId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Student with id " + req.params.studentId,
        });
      }
    } else res.send({ message: `Student was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  AuStudent.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students.",
      });
    else res.send({ message: `All Students were deleted successfully!` });
  });
};
