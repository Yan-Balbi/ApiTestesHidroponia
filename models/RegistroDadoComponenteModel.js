const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../dataBase/dbConnection');

const RegistroDadoComponenteModel = sequelize.define('registro_dado_componente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  conjunto_teste_componente_id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: false,
    allowNull: false,
    unique: false
  },
  data_hora: {
    type: DataTypes.DATE,
    allowNull: true,
    unique: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
}, {
  timestamps: false,
  freezeTableName: true
}
);

module.exports = RegistroDadoComponenteModel;