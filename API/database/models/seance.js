'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SEANCE extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    SEANCE.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: DataTypes.DATE,
        lieu: DataTypes.STRING,
        naomark: DataTypes.INTEGER,
        etat: DataTypes.STRING,
        classeEcole: DataTypes.STRING,
        id_storyboard: DataTypes.INTEGER
  },{
        sequelize,
        modelName: 'SEANCE',
    });
   SEANCE.associate = function(models){
     SEANCE.hasMany(models.EQUIPE, {foreignKey: 'id', as: 'equipe'});
     SEANCE.belongsTo(models.STORYBOARD, {foreignKey: 'id_storyboard', as:'storyboard'});
     SEANCE.hasMany(models.LOG, {foreignKey: 'id', as: 'log'});
     SEANCE.hasMany(models.DIALOGUE_PEPPER, {foreignKey: 'id', as: 'dialogue_pepper'});
   }
  return SEANCE;
};