const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/dbConnection');
const AtributoModel = require('./AtributoModel');

const SensorModel = sequelize.define('sensor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  timestamps: false,
  freezeTableName: true
}
);
AtributoModel.belongsTo(SensorModel, {foreignKey: 'sensor_id'});
SensorModel.hasMany(AtributoModel, {foreignKey: 'sensor_id'});

module.exports = SensorModel;
