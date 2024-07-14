const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/dbConnection');


const MedicaoAtuadorModel = sequelize.define('medicao_atuador', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  corrente: {
    type: DataTypes.STRING,
    autoIncrement: false,
    primaryKey: false,
    allowNull: true,
    unique: false
  },
  tensao: {
    type: DataTypes.STRING,
    autoIncrement: false,
    primaryKey: false,
    allowNull: true,
    unique: false
  },
  estado: {
    type: DataTypes.TINYINT,
    autoIncrement: false,
    primaryKey: false,
    allowNull: false,
    unique: false
  },
  atuador_id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: false,
    allowNull: false,
    unique: false
  },
  registro_dado_componente_id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: false,
    allowNull: false,
    unique: false
  }
}, {
  timestamps: false,
  freezeTableName: true,
}
);
const AtuadorModel = require('./AtuadorModel');
MedicaoAtuadorModel.belongsTo(AtuadorModel, {foreignKey: 'atuador_id'});
AtuadorModel.hasMany(MedicaoAtuadorModel, {foreignKey: 'atuador_id'});

const RegistroDadoComponenteModel = require('./RegistroDadoComponenteModel');
MedicaoAtuadorModel.belongsTo(RegistroDadoComponenteModel, {foreignKey: 'registro_dado_componente_id'});
RegistroDadoComponenteModel.hasOne(MedicaoAtuadorModel, {foreignKey: 'registro_dado_componente_id'});

module.exports = MedicaoAtuadorModel;


/*//MEU INNER JOIN

*/