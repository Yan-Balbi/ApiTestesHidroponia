const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/dbConnection');

const ConjuntoTesteComponenteModel = sequelize.define('conjunto_teste_componente', {
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

module.exports = ConjuntoTesteComponenteModel;
