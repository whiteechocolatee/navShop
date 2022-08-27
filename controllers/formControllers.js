const Callback = require("../models/callbackForm");
const User = require("../models/userModel");

const createCallback = async (req, res) => {
  const errors = {};

  if (!req.body.name) {
    errors.name = { message: "Укажите имя!" };
  }

  if (!req.body.phone) {
    errors.phone = { message: "Укажите номер!" };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { name, phone } = req.body;

    const callbackForm = await Callback.create({
      name,
      phone,
    });

    res.status(201).json(callbackForm);
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

/**
 * It gets all callbacks from the database
 * @param req - The request object.
 * @param res - The response object.
 * @returns const getCallbacks = async (req, res) => {
 *   try {
 *     const user = req.user._id;
 */
const getCallbacks = async (req, res) => {
  try {
    const user = req.user._id;

    const { isAdmin } = await User.findById(user);

    if (isAdmin) {
      const callbacks = await Callback.find().sort({
        _id: -1,
      });

      return res.status(200).json(callbacks);
    } else {
      return res.status(404).json({
        message: "Помилка! Такого запита не існує.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

/**
 * It gets a single callback by id
 * @param req - The request object.
 * @param res - The response object.
 * @returns const getSingleCallback = async (req, res) => {
 *   try {
 *     const user = req.user._id;
 *     const id = req.params.id;
 */
const getSingleCallback = async (req, res) => {
  try {
    const user = req.user._id;
    const id = req.params.id;

    const { isAdmin } = await User.findById(user);

    if (isAdmin) {
      const callback = await Callback.findById(id);

      return res.status(200).json(callback);
    } else {
      return res.status(404).json({
        message: "Помилка! Такого запита не існує.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

const updateCallbackData = async (req, res) => {
  try {
    const user = req.user._id;
    const { id, commentary } = req.body;

    const { isAdmin } = await User.findById(user);
    if (isAdmin) {
      const callback = await Callback.findById(id);

      callback.isCalled = true;

      callback.adminCommentary.push(commentary);

      callback.save();

      return res.status(200).json(callback);
    } else {
      return res.status(404).json({
        message: "Помилка! Такого запита не існує.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Помилка сервера, зверніться пізніше.",
    });
  }
};

module.exports = {
  createCallback,
  getCallbacks,
  getSingleCallback,
  updateCallbackData,
};
