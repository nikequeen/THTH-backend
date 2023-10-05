"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Requeteclient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      models.Requeteclient.belongsTo(models.Utilisateur, {
        foreignKey: {
          allownull: false,
        },
      });
      models.Requeteclient.hasOne(models.Formulaire);
    }
  }
  Requeteclient.init(
    {
      utilisateurId: DataTypes.INTEGER,
      formulaireId: DataTypes.INTEGER,
      status: DataTypes.ENUM(
        "en attente",
        "en progression",
        "terminer",
        "rejeter"
      ),
      raison: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Requeteclient",
    }
  );
  return Requeteclient;
};
