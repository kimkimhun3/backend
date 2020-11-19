require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Bruh moment" });
});
  
require("./app/routes/student.routes.js")(app);

require("./app/routes/se_student.routes.js")(app);

require("./app/routes/tm_student.routes.js")(app);

require("./app/routes/au_student.routes.js")(app);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

const db = require("./app/models/db");

// setInterval(function () {
//   db.query("SELECT * FROM students");
// }, 3000);
