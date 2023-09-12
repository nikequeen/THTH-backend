require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: "mysql",
    migrationStorageTableName: "sequelize_meta",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "database_test",
    host: process.env.HOST,
    dialect: "mysql",
    migrationStorageTableName: "sequelize_meta",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "database_production",
    host: process.env.HOST,
    dialect: "mysql",
    migrationStorageTableName: "sequelize_meta",
  },
};
