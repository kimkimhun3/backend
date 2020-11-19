module.exports = (app) => {
  const tmStudents = require("../controllers/tm_student.controller.js");

  // Create a new Customer
  app.post("/tm_students", tmStudents.create);

  // Retrieve all Customers
  app.get("/tm_students", tmStudents.findAll);

  // Retrieve a single Customer with customerId
  app.get("/tm_students/:email", tmStudents.findOne);

  // Update a Customer with customerId
  app.put("/tm_students/:email", tmStudents.update);

  // Delete a Customer with customerId
  app.delete("/tm_students/:studentId", tmStudents.delete);

  // Create a new Customer
  app.delete("/tm_students", tmStudents.deleteAll);
};
