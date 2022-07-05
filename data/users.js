const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin",
    email: "admin@testexample.com",
    password: bcrypt.hashSync("qwerty123", 5),
    isAdmin: true,
  },
  {
    name: "User",
    email: "User@testexample.com",
    password: bcrypt.hashSync("qwerty123", 5),
  },
];

module.exports = users;
