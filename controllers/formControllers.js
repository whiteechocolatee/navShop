const Callback = require("../models/callbackForm");

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
      message:
        "Не удалось отправить заявку повторите позже.",
    });
  }
};

module.exports = { createCallback };
