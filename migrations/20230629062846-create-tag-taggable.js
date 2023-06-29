"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TagTaggables", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tagId: {
        type: Sequelize.INTEGER,
        unique: "tt_unique_constraint",
      },
      taggableId: {
        type: Sequelize.INTEGER,
        unique: "tt_unique_constraint",
        references: null,
      },
      taggableType: {
        type: Sequelize.STRING,
        unique: "tt_unique_constraint",
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
    await queryInterface.dropTable("TagTaggables");
  },
};
