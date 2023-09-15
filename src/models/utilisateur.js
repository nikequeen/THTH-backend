"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Utilisateur.init(
    {
      nom: DataTypes.STRING,
      email: DataTypes.STRING,
      motdepasse: DataTypes.STRING,
      status: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Utilisateur",
    }
  );
  Utilisateur.beforeCreate(async (utilisateur) => {

    if (utilisateur.motdepasse) {
      const hashPassword = await bcrypt.hash(utilisateur.motdepasse, 10);
      utilisateur.motdepasse = hashPassword;
    }
  });
  return Utilisateur;
};