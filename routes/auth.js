const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validar-campos');

const router = Router();

//POST
router.post(
  '/login',
  [
    check('mail', 'Formato de mail incorrecto').isEmail(),
    check('pwd', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ],
  login
);

module.exports = router;
