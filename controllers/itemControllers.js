const Items = require("../models/itemModel");

/**
 * It gets all items from the database and returns them to the client
 * @param req - The request object.
 * @param res - The response object.
 */
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

/**
 * It gets an item by its id
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 */
const getItem = async (req, res) => {
  try {
    const item = await Items.findById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({
      message: "Похоже, такого товара не существует!",
    });
  }
};


/**
 * It gets 16 items from the database that match the category specified in the request
 * @param req - The request object.
 * @param res - the response object
 */
const getItemByCategory = async (req, res) => {
  try {
    const itemsByCategory = await Items.find({
      category: req.params.category,
    }).limit(16);

    res.status(200).json(itemsByCategory);
  } catch (error) {
    res.status(500).json({
      message: "Ошибка, попробуйте позже.",
    });
  }
};

/**
 * It creates an item in the database
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 */
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

module.exports = {
  getItems,
  getItem,
  getItemByCategory,
  createItem,
};
