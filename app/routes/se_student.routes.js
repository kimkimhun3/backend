module.exports = (app) => {
  const seStudents = require("../controllers/se_student.controller.js");

  // Create a new Customer
  app.post("/se_students", seStudents.create);

  // Retrieve all Customers
  app.get("/se_students", seStudents.findAll);

  // Retrieve a single Customer with customerId
  app.get("/se_students/:email", seStudents.findOne);

  // Update a Customer with customerId
  app.put("/se_students/:email", seStudents.update);

  // Delete a Customer with customerId
  app.delete("/se_students/:studentId", seStudents.delete);

  // Create a new Customer
  app.delete("/se_students", seStudents.deleteAll);
};
