'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EQUIPE', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_seance: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: 'SEANCE',
          },
          key: 'ID'
        }
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('EQUIPE');
  }
};