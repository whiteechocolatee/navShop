const express = require("express");
// const mongoose = require("mongoose");
const formData = require("express-form-data");
const connectionDataBase = require("./config/mongoDB");
const app = express();

require("dotenv").config();

/* Connecting to the database. */
connectionDataBase();

/* Setting the port to 5000 if the environment variable PORT is not set. */
const port = process.env.PORT || 5000;

/* This is a chain of middleware functions. */
app
  .use(express.json())
  .use(formData.parse())
  .use(express.urlencoded({ extended: true }))
  .use("/api/items", require("./routes/mainRoutes"));

app.listen(port, () => {
  console.log(`server was started at port - ${port}`);
});
