"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Formulaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Formulaire.belongsTo(models.Requete, {
        foreignKey: {
          allownull: false,
        },
      });
    }
  }
  Formulaire.init(
    {
      requestId: DataTypes.INTEGER,
      informationpersonnelle: DataTypes.TEXT,
      piecejointe: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Formulaire",
    }
  );
  return Formulaire;
};
