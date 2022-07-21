const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

/**
 * It takes the email and password from the request body, finds a user with that email, and if the user
 * exists and the password matches, it returns the user's id, name, email, and admin status
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const userLogin = async (req, res) => {
  const errors = {};

  if (!req.body.email) {
    errors.email = { message: "Укажите email!" };
  }

  if (!req.body.password) {
    errors.password = { message: "Укажите пароль!" };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({
        message: "Неправильный логин или пароль!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ошибка на сервере, повторите позже!",
    });
  }
};

/**
 * It takes the user's name, email, and password from the request body, checks if the user with the
 * same email already exists, and if not, creates a new user and returns the user's id, name, email,
 * isAdmin status, and token
 * @param req - The request object.
 * @param res - The response object.
 * @returns const userRegistration = async (req, res) => {
 *   const errors = {};
 */
const userRegistration = async (req, res) => {
  const errors = {};

  if (!req.body.name) {
    errors.name = { message: "Укажите имя!" };
  }

  if (!req.body.email) {
    errors.email = { message: "Укажите почту!" };
  }

  if (!req.body.password) {
    errors.password = { message: "Укажите пароль!" };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { name, email, password } = req.body;

    const isExists = await User.findOne({ email });

    if (isExists) {
      return res.status(400).json({
        message:
          "Пользователь с таким email уже существует!",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (newUser) {
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ошибка на сервере, повторите позже!",
    });
  }
};

/**
 * It finds a user by id and returns the user's name, email, and admin status
 * @param req - The request object.
 * @param res - The response object.
 */
const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res
        .status(404)
        .json({ message: "Пользователь не найден!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ошибка на сервере, повторите позже!",
    });
  }
};

/**
 * It finds a user by id, updates the user's name and email, and then saves the user
 * @param req - The request object.
 * @param res - The response object.
 */
const updateProfile = async (req, res) => {
  try {
    console.log(req.user._id);

    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Пользователь не найден!" });
  }
};

module.exports = {
  updateProfile,
  userLogin,
  userRegistration,
  userProfile,
};
