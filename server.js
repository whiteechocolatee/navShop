const express = require("express");
const mongoose = require("mongoose");
const formData = require("express-form-data");

const app = express();

require("dotenv").config();

/* Setting the port to 5000 if the environment variable PORT is not set. */
const port = process.env.PORT || 5000;

/* This is a chain of middleware functions. */
app
  .use(express.json())
  .use(formData.parse())
  .use(express.urlencoded({ extended: true }))
  .use("/api/items", require("./routes/mainRoutes"));

/* Connecting to the mongoDB database and then starting the server. */
mongoose
  .connect(`mongodb://127.0.0.1:27017/shop`)
  .then(() => {
    app.listen(port, () => {
      console.log(`server was started at port - ${port}`);
    });
  });
