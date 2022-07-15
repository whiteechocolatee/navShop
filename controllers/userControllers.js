const User = require("../models/userModel");

/**
 * It takes the email and password from the request body, finds a user with that email, and if the user
 * exists and the password matches, it returns the user's id, name, email, and admin status
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const login = async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: null,
      });
    } else {
      res.status(401).json({
        message: "Неправильный логин или пароль!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Ошибка на сервере, повторите позже!",
    });
  }
};

module.exports = {
  login,
};
