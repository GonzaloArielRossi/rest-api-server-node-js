const validateJWT = require('../middlewares/validar-jwt');
const validateFields = require('../middlewares/validar-campos');
const validateRoles = require('../middlewares/validate-user-role');

module.exports = {
  ...validateJWT,
  ...validateFields,
  ...validateRoles
};
