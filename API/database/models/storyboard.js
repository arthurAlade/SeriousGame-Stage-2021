'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class STORYBOARD extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    STORYBOARD.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        texte: DataTypes.STRING
  }, {
        sequelize,
        modelName: 'STORYBOARD',
    });
    STORYBOARD.associate = function(models) {
        STORYBOARD.hasMany(models.SEANCE, {foreignKey: 'id', as: 'seance'});
    }
  return STORYBOARD;
};