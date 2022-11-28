'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('APPAREIL', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_equipe: {
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: 'EQUIPE',
          },
          key: 'ID',
        }
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adresse_ip: {
        allowNull: false,
        type: Sequelize.STRING
      },
      adresse_mac: {
        allowNull: false,
        type: Sequelize.STRING
      },
      batterie: {
        type: Sequelize.INTEGER
      },
      naomark: {
        allowNull: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('APPAREIL');
  }
};