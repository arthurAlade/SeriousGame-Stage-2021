'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LOG extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    LOG.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_seance: DataTypes.INTEGER,
        id_appareil: DataTypes.INTEGER,
        id_equipe: DataTypes.INTEGER,
        date: DataTypes.DATE,
        type: DataTypes.STRING,
        description: DataTypes.STRING
  }, {
        sequelize,
        modelName: 'LOG',
    });
    LOG.associate = function(models){
        LOG.belongsTo(models.SEANCE, {foreignKey: 'id_seance', as: 'seance'});
        LOG.belongsTo(models.APPAREIL, {foreignKey: 'id_appareil', as:'appareil'});
        LOG.belongsTo(models.EQUIPE, {foreignKey: 'id_equipe', as:'equipe'});
    };

  return LOG;
};