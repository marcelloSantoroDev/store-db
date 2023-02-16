const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.post('/', salesController.insert);
router.get('/', salesController.getAll);
router.get('/:id', salesController.getSaleById);
router.delete('/:id', salesController.deleteSale);

module.exports = router;