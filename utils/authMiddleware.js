const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protection = async (req, res, next) => {
  let token;

  console.log(req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
      );

      req.user = await User.findById(decoded.id).select(
        "-password",
      );

      next();
    } catch (error) {
      res.status(401).json({
        message:
          "Не авторизирован, срок действия токена истек",
      });
    }
  }

  if (!token) {
    res.status(401).json({
      message: "Не авторизирован, токен не найден",
    });
  }
};

module.exports = protection;
