const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/dbConnection');

const AtuadorModel = sequelize.define('atuador', {
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

module.exports = AtuadorModel;
