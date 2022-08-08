const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
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

//GOOGLE
router.post(
  '/google',
  [check('id_token', 'Toke Id es necesario').not().isEmpty(), validateFields],
  googleSignIn
);
module.exports = router;
