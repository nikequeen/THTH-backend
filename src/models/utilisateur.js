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
      status: DataTypes.ENUM,
      type: DataTypes.ENUM,
    },
    {
      sequelize,
      modelName: "Utilisateur",
    }
  );
  Utilisateur.beforeCreate(async (Utilisateur) => {
    try {
      const hashedPassword = await bcrypt.hash(Utilisateur.motdepasse, 10);
      Utilisateur.motdepasse = hashedPassword;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
      throw error;
    }
  });
  return Utilisateur;
};
