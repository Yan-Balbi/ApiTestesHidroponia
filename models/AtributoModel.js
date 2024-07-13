const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/dbConnection');
// const SensorModel = require('./SensorModel.js');

const AtributoModel = sequelize.define('atributo', {
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
  sensor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,//todo - ver isso depois, o ideal é ser false aqui
    unique: false
//    defaultValue: 0//TODO - CORRIGIR ISSO DEPOIS
  }
}, {
  timestamps: false,
  freezeTableName: true
}
);
//AtributoModel.belongsTo(SensorModel, {foreignKey: 'sensor_id'});

module.exports = AtributoModel;
