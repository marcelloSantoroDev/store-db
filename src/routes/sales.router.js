const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.post('/', salesController.insert);

module.exports = router;