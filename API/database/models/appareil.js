'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class APPAREIL extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    APPAREIL.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_equipe: DataTypes.INTEGER,
        nom: DataTypes.STRING,
        adresse_ip: DataTypes.STRING,
        adresse_mac: DataTypes.STRING,
        naomark: DataTypes.INTEGER,
        batterie: DataTypes.INTEGER,
      },
      {
          sequelize,
          modelName: 'APPAREIL',
      });
  APPAREIL.associate = function(models){
    APPAREIL.belongsTo(models.EQUIPE, {foreignKey: 'id_equipe', as: 'equipe'});
    APPAREIL.hasMany(models.LOG, {foreignKey: 'id', as: 'log'});
  }
  return APPAREIL;
};