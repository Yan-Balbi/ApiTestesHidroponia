const express = require('express');
const atributoController = require('../controller/AtributoController');

const router = express.Router();

router.post("/insert_atributos_by_id", atributoController.insertById);
router.post("/insert_atributos_by_nome", atributoController.insertByNome);

module.exports = router;