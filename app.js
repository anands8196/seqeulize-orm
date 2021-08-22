const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const appRoutes = require("./routes.js");

const PORT = 8087;

app.use("/", appRoutes);

app.listen(PORT, function () {
  console.log("app is running");
});
