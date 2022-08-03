const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validar-campos');
const {
  isRoleValid,
  mailExists,
  userIdExists
} = require('../helpers/db-validators');
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers
} = require('../controllers/users');

const router = Router();

//GET
router.get('/', getUsers);

//POST
router.post(
  '/',
  [
    check('mail', 'El correo no es válido').isEmail(),
    check('mail').custom(mailExists),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('pwd', 'Ingrese una pwd de mas de 6 caracteres').isLength({ min: 6 }),
    check('role').custom(isRoleValid),
    validateFields
  ],
  postUsers
);

//PUT
router.put(
  '/:userId',
  [
    check('userId', 'El id no es válido').isMongoId(),
    check('userId').custom(userIdExists),
    check('role').custom(isRoleValid),
    validateFields
  ],
  putUsers
);

//PATCH
router.patch('/', patchUsers);

//DELETE
router.delete(
  '/:userId',
  [
    check('userId', 'El id no es válido').isMongoId(),
    check('userId').custom(userIdExists),
    validateFields
  ],
  deleteUsers
);

module.exports = router;
