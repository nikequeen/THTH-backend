"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Requete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Requete.init(
    {
      nom: DataTypes.STRING,
      description: DataTypes.STRING,
      prix: DataTypes.INTEGER,
      status: DataTypes.ENUM("en attente", "en cours", "terminer"),
    },
    {
      sequelize,
      modelName: "Requete",
    }
  );
  return Requete;
};
