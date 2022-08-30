const Items = require("../models/itemModel");
const User = require("../models/userModel");

/**
 * It gets all items from the database and returns them to the client
 * @param req - The request object.
 * @param res - The response object.
 */
const getItems = async (req, res) => {
  try {
    const items = await Items.find().sort({ _id: -1 });
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
const getItemsByCategory = async (req, res) => {
  try {
    const itemsByCategory = await Items.find({
      category: req.params.category,
    });

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
      discount,
      description,
      itemImage,
      color,
      company,
      model,
      memory,
      category,
      categoryUA,
      characteristics,
      count,
    } = req.body;

    const user = req.user._id;

    const { isAdmin } = await User.findById(user);

    if (isAdmin) {
      const totalPrice = price;

      const item = await Items.create({
        title, // title
        price, // price
        discount, // discount
        description, // description
        itemImage, // itemImage
        color, // color
        company, // company
        model, // model
        memory, /// memory
        category, // category
        categoryUA, // categoryUA
        characteristics, // characteristics
        count, // count
        totalPrice, // totalPrice
      });

      res.status(201).json(item);
    } else {
      res
        .status(400)
        .json({ message: "Такого статуса не існує" });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Произошла ошибка при создании товара. Попробуйте позже.",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user._id;

    const { isAdmin } = await User.findById(user);

    if (isAdmin) {
      const product = await Items.findById(id);

      if (product) {
        await product.remove();

        const items = await Items.find();

        res.status(200).json(items);
      }
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Виникла помилка при запиті. Спробуйте пізніше!",
    });
  }
};

/**
 * It updates an item in the database
 * @param req - The request object.
 * @param res - the response object
 */
const updateItems = async (req, res) => {
  try {
    const user = req.user._id;
    const editedItem = req.body;

    const { isAdmin } = await User.findById(user);

    if (isAdmin) {
      const item = await Items.findById(editedItem.id);

      if (item) {
        item.title = editedItem.title;
        item.price = editedItem.price;
        item.discount = editedItem.discount;
        item.description = editedItem.description;
        item.itemImage = editedItem.itemImage;
        item.categoryUA = editedItem.categoryUA;
        item.category = editedItem.category;
        item.characteristics = editedItem.characteristics;
        item.count = editedItem.count;
        item.totalPrice = editedItem.totalPrice;
        item.color = editedItem.color;
        item.company = editedItem.company;
        item.model = editedItem.model;

        if (editedItem.memory) {
          item.memory = editedItem.memory;
        }
      }

      const updatedItem = await item.save();

      res.status(200).json(updatedItem);
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Произошла ошибка при создании товара. Попробуйте позже.",
    });
  }
};

module.exports = {
  getItems,
  getItem,
  getItemsByCategory,
  createItem,
  updateItems,
  deleteProduct,
};
