'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requeteclients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      utilisateurId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Utilisateurs',
          key: 'id'
        }
      },
      formulaireId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Formulaires',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM("en attente", "en progression", "terminer", "rejeter"),
        allowNull: false,
      },
      raison: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Requeteclients');
  }
};