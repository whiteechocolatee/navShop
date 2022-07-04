const mongoose = require("mongoose");

const connectionDataBase = async () => {
  try {
    const connection = mongoose.connect(
      process.env.MONGODB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log(`mongo connected`);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

module.exports = connectionDataBase;
