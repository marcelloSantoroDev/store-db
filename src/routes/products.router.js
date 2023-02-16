const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers');

router.get('/search', productsController.search);
router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);

router.post('/', productsController.insert);

router.put('/:id', productsController.update);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;