const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles } = require('../controllers/uploads');
const { validateFields } = require('../middlewares/validar-campos');

const router = Router();

//POST
router.post('/', uploadFiles);

module.exports = router;
