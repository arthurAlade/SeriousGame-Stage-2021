'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LOG', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_seance: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName:'SEANCE',
          },
          key: 'ID',
        },
      },
      id_appareil: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'APPAREIL',
          },
          key: 'ID',
        },
      },
      id_equipe: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'EQUIPE'
          }
        }
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      type: {
        allowNull:true,
        type: Sequelize.STRING
      },
      description: {
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
    await queryInterface.dropTable('LOG');
  }
};