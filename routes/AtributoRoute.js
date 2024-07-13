const express = require('express');
const atributoController = require('../controller/AtributoController');

const router = express.Router();

router.post("/insert_atributos", atributoController.insert);

module.exports = router;