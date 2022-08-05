const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const login = async (req = request, res = response) => {
  const { mail, pwd } = req.body;

  try {
    //verificar si existe el mail
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        msg: 'user/pwd not valid: mail'
      });
    }
    //verificar si usuario está activo
    if (!user.state) {
      return res.status(400).json({
        msg: 'el usuario fue eliminado'
      });
    }
    //verificar pwd
    const validPwd = bcrypt.compareSync(pwd, user.pwd);
    if (!validPwd) {
      return res.status(400).json({
        msg: 'user/pwd not valid: pwd'
      });
    }
    //generar JWT
    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'algo salió mal'
    });
  }
};

module.exports = {
  login
};
