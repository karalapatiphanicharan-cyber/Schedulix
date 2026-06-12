const express = require('express');
const router = express.Router();
const simulationController = require('../controllers/simulationController');

router.post('/simulate', simulationController.simulate);

module.exports = router;
