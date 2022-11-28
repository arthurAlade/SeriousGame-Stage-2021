'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DIALOGUE_PEPPER extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    DIALOGUE_PEPPER.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        id_seance: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        dialogue: DataTypes.STRING,
        phrase:DataTypes.STRING,
        animation:DataTypes.STRING,
  },{
        sequelize,
        modelName: 'DIALOGUE_PEPPER',
    });
  DIALOGUE_PEPPER.associate = function(models){
    DIALOGUE_PEPPER.belongsTo(models.SEANCE, {foreignKey: 'id_seance', as:'seance'});
  };
  return DIALOGUE_PEPPER;
};