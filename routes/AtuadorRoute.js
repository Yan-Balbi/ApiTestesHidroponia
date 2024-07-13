const express = require('express');
const atuadorController = require('../controller/AtuadorController');

const router = express.Router();

router.post("/insert_atuador", atuadorController.insert);

module.exports = router;