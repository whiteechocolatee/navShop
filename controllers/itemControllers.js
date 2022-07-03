const Items = require("../models/itemModel");

const getItems = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message:
        "Не удалось получить список товаров. Повторите попытку позже.",
    });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Items.find({ _id: req.params.id });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({
      message: "Похоже, такого товара не существует!",
    });
  }
};

const createItem = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      itemImage,
      category,
    } = req.body;

    const item = await Items.create({
      title,
      price,
      description,
      itemImage,
      category,
    });

    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Произошла ошибка при создании товара. Попробуйте позже.",
    });
  }
};

module.exports = { getItems, getItem, createItem };
