const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/dbConnection');


const MedicaoSensorModel = sequelize.define('medicao_sensor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  valor_medido: {
    type: DataTypes.STRING,
    autoIncrement: false,
    primaryKey: false,
    allowNull: false,
    unique: false
  },
  atributo_id: {
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
const AtributoModel = require('./AtributoModel');
MedicaoSensorModel.belongsTo(AtributoModel, {foreignKey: 'atributo_id'});
AtributoModel.hasMany(MedicaoSensorModel, {foreignKey: 'atributo_id'});

const RegistroDadoComponenteModel = require('./RegistroDadoComponenteModel');
MedicaoSensorModel.belongsTo(RegistroDadoComponenteModel, {foreignKey: 'registro_dado_componente_id'});
RegistroDadoComponenteModel.hasOne(MedicaoSensorModel, {foreignKey: 'registro_dado_componente_id'});

module.exports = MedicaoSensorModel;
/*//INNER JOIN DA MAQUINA
SELECT ms.valor_medido, s.nome, a.nome, rdc.data_hora
FROM medicao_sensor ms
JOIN atributo a ON ms.atributo_id = a.id
JOIN sensor s ON a.sensor_id = s.id
JOIN registro_dado_componente rdc ON ms.registro_dado_componente_id = rdc.id
JOIN conjunto_teste_componente ctc ON rdc.conjunto_teste_componente_id = ctc.id
WHERE a.nome = 'attribute_name'  -- replace with the desired attribute name
AND s.nome = 'sensor_name'  -- replace with the desired sensor name
AND ctc.nome = 'test_component_name';
*/

/*//MEU INNER JOIN
SELECT MS.valor_medido, S.nome, A.nome, RDC.data_hora
FROM sensor S
JOIN atributo A ON S.id = A.sensor_id
JOIN medicao_sensor MS ON A.id = MS.atributo_id
JOIN registro_dado_componente RDC ON MS.registro_dado_componente_id = RDC.id
JOIN conjunto_teste_componente CTC ON RDC.conjunto_teste_componente_id = CTC.id
WHERE A.nome = 'temperatura do ambiente'  -- replace with the desired attribute name
AND S.nome = 'DHT4'  -- replace with the desired sensor name
AND CTC.nome = 'testando temperaturaSensor DHT4';
*/