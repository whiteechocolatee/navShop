const Item = require("../models/itemModel");
const Users = require("../models/userModel");
const items = require("../data/items");
const users = require("../data/users");

const postTestItems = async (req, res) => {
  const data = await Item.insertMany(items);

  res.send(data);
};

const postTestUsers = async (req, res) => {
  const data = await Users.insertMany(users);

  res.send(data);
};

module.exports = { postTestItems, postTestUsers };
