module.exports = (app) => {
  const students = require("../controllers/student.controller.js");

  // Create a new Customer
  app.post("/students", students.create);

  // Retrieve all Customers
  app.get("/students", students.findAll);

  // Retrieve a single Customer with customerId
  app.get("/students/:base64Code", students.findOne);

  // Update a Customer with customerId
  app.put("/students/:base64Code", students.update);

  // Delete a Customer with customerId
  app.delete("/students/:studentId", students.delete);

  // Create a new Customer
  app.delete("/students", students.deleteAll);
};
