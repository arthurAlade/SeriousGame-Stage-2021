'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DIALOGUE_PEPPER', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      id_seance: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'SEANCE',
          },
          key: 'ID',
        }
      },
      dialogue: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phrase: {
        type : Sequelize.STRING,
      },
      animation: {
        type : Sequelize.STRING,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DIALOGUE_PEPPER');
  }
};