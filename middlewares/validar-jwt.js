const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en el request'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: 'El usuario no existe en la BBDD'
      });
    }
    if (!user.state) {
      return res.status(401).json({
        msg: 'El usuario fue dado de baja'
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: 'token no válido'
    });
  }
};

module.exports = { validateJWT };
