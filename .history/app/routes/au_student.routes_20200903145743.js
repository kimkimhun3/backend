module.exports = (app) => {
  const auStudents = require("../controllers/au_student.controller.js");

  // Create a new Customer
  // app.post("/au_students", auStudents.create);

  app.route('/au_student'.post(au))

  // Retrieve all Customers
  app.get("/au_students", auStudents.findAll);

  // Retrieve a single Customer with customerId
  app.get("/au_students/:email", auStudents.findOne);

  // Update a Customer with customerId
  app.put("/au_students/:email", auStudents.update);

  // Delete a Customer with customerId
  app.delete("/au_students/:studentId", auStudents.delete);

  // Create a new Customer
  app.delete("/au_students", auStudents.deleteAll);
};
