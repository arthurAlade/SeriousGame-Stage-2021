'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class JOUEUR extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    JOUEUR.init({
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          id_equipe: DataTypes.INTEGER,
          nom: {
              type: DataTypes.STRING,
          },
          prenom:{
              type: DataTypes.STRING,
          },
          role: DataTypes.STRING
       }, {
        sequelize,
        modelName: 'JOUEUR',
    });
   JOUEUR.associate = function(models) {
     JOUEUR.belongsTo(models.EQUIPE, {foreignKey: 'id_equipe', as:'equipe'});
   };
  return JOUEUR;
};