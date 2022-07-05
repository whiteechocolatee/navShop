const bcrypt = require("bcryptjs");

export const users = [
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
