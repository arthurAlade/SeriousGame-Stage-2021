'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EQUIPE extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    EQUIPE.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_seance: DataTypes.INTEGER,
        nom: DataTypes.STRING,
        role: DataTypes.STRING
  },{
        sequelize,
        modelName: 'EQUIPE',
    });
   EQUIPE.associate = function(models) {
     EQUIPE.belongsTo(models.SEANCE, {foreignKey: 'id_seance', as:'seance'});
     EQUIPE.hasMany(models.JOUEUR, {foreignKey: 'id', as: 'joueurs'});
     EQUIPE.hasOne(models.APPAREIL, {foreignKey: 'id', as: 'tablette'});
     EQUIPE.hasMany(models.LOG, {foreignKey: 'id', as: 'log'});
   };
  return EQUIPE;
};