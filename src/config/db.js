const mongoose = require("mongoose");

exports.dbConfig = async () => {
  const dbUrl = process.env.DB_URL?.trim();

  if (!dbUrl || !/^mongodb(\+srv)?:\/\//.test(dbUrl)) {
    throw new Error("A valid MongoDB DB_URL is required in the .env file");
  }

  await mongoose.connect(dbUrl, { serverSelectionTimeoutMS: 5000 });
  console.log("database connection successful");
};
