const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    .then(() => console.log("DB connection is successful"))

    .catch((err) => {
      console.log("Error in Db connection");
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
