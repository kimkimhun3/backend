const TmStudent = require("../models/tm_student.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const se_student = new TmStudent({
    email: req.body.email,
    name: req.body.name,
    attended: req.body.attended,
    iqAttended: req.body.iqAttended,
    iqScore: req.body.iqScore,
    englishAttended: req.body.englishAttended,
    englishScore: req.body.englishScore,
    passed: req.body.passed,
  });

  TmStudent.create(se_student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  TmStudent.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  TmStudent.findByEmail(req.params.email, (err, data) => {
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

  TmStudent.updateByEmail(
    req.params.email,
    new TmStudent(req.body),
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
  TmStudent.remove(req.params.studentId, (err, data) => {
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
  TmStudent.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students.",
      });
    else res.send({ message: `All Students were deleted successfully!` });
  });
};
