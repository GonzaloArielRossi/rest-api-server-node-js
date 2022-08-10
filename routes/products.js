const { Router } = require('express');
const { check } = require('express-validator');
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/products');
const {
  categorieIdExists,
  productIdExists
} = require('../helpers/db-validators');
const { validateAdminRole } = require('../middlewares');
const { validateFields } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');

const router = Router();

//GET - Obtener todas los productos - publico
router.get('/', getProducts);

//GET - Obtener una categoria por id - publico
router.get(
  '/:id',
  [
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(productIdExists),
    validateFields
  ],
  getProduct
);

//POST - Crear Producto - Privado - Cualquier user Role
router.post(
  '/',
  [
    validateJWT,
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('categorie', 'El id de la categoria no es valida').isMongoId(),
    check('categorie').custom(categorieIdExists),
    validateFields
  ],
  createProduct
);

//PUT - Actualizar producto por ID - Privado - Cualquier user Role
router.put(
  '/:id',
  [validateJWT, check('id').custom(productIdExists), validateFields],
  updateProduct
);

//DELETE - Borrar una categoria por id- SOLO ADMIN_ROLE
router.delete(
  '/:id',
  [
    validateJWT,
    validateAdminRole,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(productIdExists),
    validateFields
  ],
  deleteProduct
);

module.exports = router;
