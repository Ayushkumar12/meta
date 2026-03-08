const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Test Route
router.get('/ping', apiController.ping);

// Example Data Route
router.get('/data', apiController.getData);

module.exports = router;
