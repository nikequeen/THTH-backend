const config = require("../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    host: config.db_host,
    dialect: "mysql",
  }
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
module.exports = sequelize;
