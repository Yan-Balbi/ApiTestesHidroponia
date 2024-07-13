const express = require('express');
const sequelize = require('./dataBase/dbConnection');
const testModel = require('./models/ConjuntoComponenteTesteModel');
const testeRoute = require('./routes/ConjuntoComponenteTesteRoute');
const sensorRoute = require('./routes/SensorRoute');
const atuadorRoute = require('./routes/AtuadorRoute');
const atributoRoute = require('./routes/AtributoRoute');
const registroDadosRoute = require('./routes/RegistroDadoComponenteRoute');

const app = express();
app.use(express.json());

app.use(/*"/insert_test",*/ testeRoute);
app.use(/*"/insert_test",*/ sensorRoute);
app.use(atuadorRoute);
app.use(atributoRoute);
app.use(registroDadosRoute);


module.exports = app;