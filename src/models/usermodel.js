const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("./index");
const usermodel = sequelize.define("users", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motdepasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('actif, inactif'),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('admin, agent, client'),
    allowNull: false,
  },
});
usermodel.beforeCreate(async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.motdepasse, 10);
    user.motdepasse = hashedPassword;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
});
sequelize
  .sync()
  .then(() => {
    console.log("Text table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
module.exports = usermodel;
