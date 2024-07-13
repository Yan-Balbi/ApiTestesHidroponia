const express = require('express');
const RegistroDadoComponenteController = require('../controller/RegistroDadoComponenteController');

const router = express.Router();

router.post("/insert_registro_dado", RegistroDadoComponenteController.insertRegistroDado);
router.post("/insert_medicao_sensor", RegistroDadoComponenteController.insertMedicaoSensor);
router.post("/insert_medicao_atuador", RegistroDadoComponenteController.insertMedicaoAtuador);

module.exports = router;