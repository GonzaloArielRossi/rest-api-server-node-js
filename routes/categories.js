const { Router } = require('express');
const { check } = require('express-validator');
const {
  createCategorie,
  getCategories,
  getCategorie,
  updateCategorie,
  deleteCategorie
} = require('../controllers/categories');
const { categorieIdExists } = require('../helpers/db-validators');
const { validateAdminRole } = require('../middlewares');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');

const router = Router();

//GET - Obtener todas las categorias - publico
router.get('/', getCategories);

//GET - Obtener una categoria por id - publico
router.get(
  '/:id',
  [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categorieIdExists),
    validateFields
  ],
  getCategorie
);

//POST - Crear Categoria - Privado - Cualquier user Role
router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
  ],
  createCategorie
);

//PUT - Actualizar categoria por ID - Privado - Cualquier user Role
router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categorieIdExists),
    validateFields
  ],
  updateCategorie
);

//DELETE - Borrar una categoria por id- SOLO ADMIN_ROLE
router.delete(
  '/:id',
  [
    validateJWT,
    validateAdminRole,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categorieIdExists),
    validateFields
  ],
  deleteCategorie
);

module.exports = router;
