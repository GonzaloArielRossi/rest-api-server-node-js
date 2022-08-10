const { Router } = require('express');
const { search } = require('../controllers/search');

const router = Router();

// GET BUSQUEDA

router.get('/:collection/:query', search);

module.exports = router;
