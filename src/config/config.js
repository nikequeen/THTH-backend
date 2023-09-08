const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  host: `${process.env.HOST}`,
  port: `${process.env.PORT}`,
  db_name: `${process.env.DB_NAME}`,
  db_username: `${process.env.DB_USERNAME}`,
  db_password: `${process.env.DB_PASSWORD}`,
  
};
