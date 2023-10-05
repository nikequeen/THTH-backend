'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Requete extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Requete.hasMany(models.Formulaire)
    }
  }
  Requete.init({
    nom: DataTypes.STRING,
    description: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    type: DataTypes.ENUM("Acte de naissnce", "Carte nationnale d'identite", "Passport", "Duplicata de carte")
  }, {
    sequelize,
    modelName: 'Requete',
  });
  return Requete;
};