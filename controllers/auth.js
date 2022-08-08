const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, mail } = await googleVerify(id_token);

    let user = await User.findOne({ mail });

    if (!user) {
      //create user
      const userData = {
        name,
        mail,
        pwd: 'x',
        img,
        google: true
      };

      user = new User(userData);
      await user.save();
    }
    if (!user.state) {
      return res.status(401).json({
        msg: 'Usuario invalido, hable con el administrador'
      });
    }

    //generar JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: 'algo salió mal',
      ok: false
    });
  }
};
module.exports = {
  login,
  googleSignIn
};
