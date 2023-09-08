"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nom: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      motdepasse: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("actif", "inactif"),
        defaultValue: "actif",
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("admin", "agent", "client"),
        defaultValue: "client",
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
