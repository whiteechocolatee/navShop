const User = require("../models/userModel");
const Item = require("../models/itemModel");
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
    errors.name = { message: "Вкажіть ім'я!" };
  }

  if (!req.body.surname) {
    errors.surname = { message: "Вкажіть призвище!" };
  }

  if (!req.body.email) {
    errors.email = { message: "Вкажіть почту!" };
  }

  if (!req.body.phoneNumber) {
    errors.phoneNumber = {
      message: "Вкажіть номер телефону!",
    };
  }

  if (!req.body.password) {
    errors.password = { message: "Вкажіть пароль!" };
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { name, surname, phoneNumber, email, password } =
      req.body;

    const isExists = await User.findOne({ email });

    if (isExists) {
      return res.status(400).json({
        message: "Користувач с такою почтою вже існує!",
      });
    }

    const newUser = await User.create({
      name,
      surname,
      phoneNumber,
      email,
      password,
    });

    if (newUser) {
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        surname: newUser.surname,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        addresses: newUser.addresses,
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

    const favorites = user.favorites;

    const ids = favorites.map((item) => {
      return item.product;
    });

    const records = await Item.find()
      .where("_id")
      .in(ids)
      .exec();

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
        email: user.email,
        isAdmin: user.isAdmin,
        addresses: user.addresses,
        favorites: records,
        createdAt: user.createdAt,
      });
    } else {
      res
        .status(404)
        .json({ message: "Користувач не знайден!" });
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
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.surname = req.body.surname || user.surname;
      user.email = req.body.email || user.email;
      user.phoneNumber =
        req.body.phoneNumber || user.phoneNumber;
      if (req.body.password) {
        user.password = req.body.password;
      }
    } else {
      res
        .status(404)
        .json({ message: "Користувач не знайден!" });
    }

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      isAdmin: user.isAdmin,
      addresses: user.addresses,
      createdAt: user.createdAt,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Такий користувач вже існує!" });
  }
};

/**
 * It adds an address to the user's profile
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 */
const addAddress = async (req, res) => {
  try {
    const address = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      user.addresses = address || user.addresses;
    } else {
      res
        .status(404)
        .json({ message: "Користувач не знайден!" });
    }

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      addresses: user.addresses,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Щось пішло не так, зверніться пізніше",
    });
  }
};

/**
 * It adds a product to the user's favorites
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const addToFavorite = async (req, res) => {
  try {
    const favoriteItem = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      const alreadyFavorite = user.favorites.find(
        (item) =>
          item.product.toString() ===
          favoriteItem.product.toString(),
      );

      if (alreadyFavorite) return res.status(400);
    } else {
      res
        .status(404)
        .json({ message: "Користувач не знайден!" });
    }

    user.favorites.push(favoriteItem);

    const favorites = user.favorites;

    const ids = favorites.map((item) => {
      return item.product;
    });

    const records = await Item.find()
      .where("_id")
      .in(ids)
      .exec();

    const updatedUser = await user.save();

    return res.json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      favorites: records,
      addresses: user.addresses,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({
      message: "Щось пішло не так, зверніться пізніше",
    });
  }
};

/**
 * It removes a product from the user's favorites
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - the response object
 */
const removeFromFavorite = async (req, res) => {
  try {
    const favoriteToRemove = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
      const favorites = user.favorites;

      const editedFavorites = favorites.filter(
        (favorite) => {
          return (
            favorite.product.toString() !==
            favoriteToRemove.product.toString()
          );
        },
      );

      user.favorites = editedFavorites;

      const updatedUser = await user.save();

      const ids = updatedUser.favorites.map((item) => {
        return item.product;
      });

      const records = await Item.find()
        .where("_id")
        .in(ids)
        .exec();

      return res.json({
        _id: user._id,
        name: user.name,
        surname: user.surname,
        phoneNumber: user.phoneNumber,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        favorites: records,
        addresses: user.addresses,
        token: generateToken(user._id),
      });
    } else {
      res
        .status(404)
        .json({ message: "Користувач не знайден!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Щось пішло не так, зверніться пізніше",
    });
  }
};

module.exports = {
  addAddress,
  updateProfile,
  userLogin,
  userRegistration,
  userProfile,
  addToFavorite,
  removeFromFavorite,
};
