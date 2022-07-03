const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

const port = process.env.PORT || 5000;

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(`${__dirname}/assets`));

mongoose.connect(`mongodb://127.0.0.1:27017`).then(() => {
  app.listen(port, () => {
    console.log(`server was started at port - ${port}`);
  });
});
