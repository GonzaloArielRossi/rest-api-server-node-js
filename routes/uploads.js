const { Router } = require('express');
const { check } = require('express-validator');
const {
  uploadFiles,
  updateImage,
  getImage
} = require('../controllers/uploads');
const { validateAllowedCollections } = require('../helpers');
const { validateFilesBeforeUpload, validateFields } = require('../middlewares');

const router = Router();

//POST
router.post('/', validateFilesBeforeUpload, uploadFiles);

//PUT
router.put(
  '/:collection/:id',
  [
    validateFilesBeforeUpload,
    check('id', 'Id invalido').isMongoId(),
    check('collection').custom((c) =>
      validateAllowedCollections(c, ['users', 'products'])
    ),
    validateFields
  ],
  updateImage
);

//GET
router.get(
  '/:collection/:id',
  [
    check('id', 'Id invalido').isMongoId(),
    check('collection').custom((c) =>
      validateAllowedCollections(c, ['users', 'products'])
    ),
    validateFields
  ],
  getImage
);

module.exports = router;
