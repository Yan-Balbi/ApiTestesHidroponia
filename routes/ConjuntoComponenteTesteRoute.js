const express = require('express');
const testController = require('../controller/ConjuntoComponenteTesteController');

const router = express.Router();

router.get("/get_all_tests", testController.getAllTests);

router.post("/insert_test", testController.insertTest);

module.exports = router;