require("dotenv").config();
const app = require("./app");
const { dbConfig } = require("./config/db");
const port = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await dbConfig();
    app.listen(port, () => {
      console.log(`server is running on port number ${port}`);
    });
  } catch (error) {
    console.error(`server startup failed: ${error.message}`);
    process.exitCode = 1;
  }
};

startServer();