const { response } = require('express');

const validateAdminRole = async (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Error interno: se esta verificando rol sin previa validación del token'
    });
  }
  try {
    const { role } = req.user;
    if (role !== 'ADMIN_ROLE') {
      return res.status(401).json({
        msg: 'No tiene permisos para ejecutar esta operación'
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: 'error al verificar el tipo de usuario'
    });
  }
};

const hasThisRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'Error interno: se esta verificando rol sin previa validación del token'
      });
    }
    try {
      const { role } = req.user;
      if (!roles.includes(role)) {
        return res.status(401).json({
          msg: 'No tiene permisos para ejecutar esta operación'
        });
      }
      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({
        msg: 'error al verificar el tipo de usuario'
      });
    }
  };
};

module.exports = {
  validateAdminRole,
  hasThisRoles
};
