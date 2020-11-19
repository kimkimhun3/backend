const Student = require("../models/student.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const student = new Student({
    email: req.body.email,
    name: req.body.name,
    gender: req.body.gender,
    major: req.body.major,
    dob: req.body.dob,
    identityCard: req.body.identityCard,
    transcript: req.body.transcript,
    phoneNumber: req.body.phoneNumber,
    guardianNumber: req.body.guardianNumber,
    schoolLocation: req.body.schoolLocation,
    educationStatus: req.body.educationStatus,
    currentGrade: req.body.currentGrade,
    currentMajor: req.body.currentMajor,
    university: req.body.university,
    school: req.body.school,
    baciiGrade: req.body.baciiGrade,
    mathGrade: req.body.mathGrade,
    examDate: req.body.examDate,
    examTime: req.body.examTime,
    expiration: req.body.expiration,
    base64Code: req.body.base64Code,
    attended: req.body.attended,
  });

  Student.create(student, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Student.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Student.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Student.findByBase64Code(req.params.base64Code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.base64Code}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Student with id " + req.params.base64Code,
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

  Student.updateByBase64Code(
    req.params.base64Code,
    new Student(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.base64Code}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Student with id " + req.params.base64Code,
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Student.remove(req.params.studentId, (err, data) => {
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
  Student.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all students.",
      });
    else res.send({ message: `All Students were deleted successfully!` });
  });
};
