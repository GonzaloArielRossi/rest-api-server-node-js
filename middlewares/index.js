const validateJWT = require('../middlewares/validar-jwt');
const validateFields = require('../middlewares/validar-campos');
const validateRoles = require('../middlewares/validate-user-role');
const validateFiles = require('../middlewares/validate-files');
module.exports = {
  ...validateJWT,
  ...validateFields,
  ...validateRoles,
  ...validateFiles
};
