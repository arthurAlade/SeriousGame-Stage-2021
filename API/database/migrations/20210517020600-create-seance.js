'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SEANCE', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      lieu: {
        allowNull: false,
        type: Sequelize.STRING
      },
      naomark: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_storyboard: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'STORYBOARD',
          },
          key: 'ID',
        }
      },
      etat:{
        allowNull: false,
        type: Sequelize.STRING
      },
      classeEcole:{
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
    await queryInterface.dropTable('SEANCE');
  }
};