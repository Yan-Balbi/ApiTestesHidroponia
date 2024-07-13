const express = require('express');
const sensorController = require('../controller/SensorController');

const router = express.Router();

router.post("/insert_sensor", sensorController.insert);
router.post("/insert_sensor_com_atributos", sensorController.insertSensorComAtributos);

module.exports = router;