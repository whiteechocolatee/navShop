const Users = require("../models/userModel");
const users = require("../data/users");

const postTestUsers = async (req, res) => {
  await Users.remove();
  const data = await Users.insertMany(users);

  res.send(data);
};

module.exports = { postTestUsers };
