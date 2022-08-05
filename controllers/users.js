const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getUsers = async (req = request, res = response) => {
  const { limit, start } = req.query;
  const query = { state: true };

  //EJECUTAR AMBAS QUERYS AL MISMO TIEMPO
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(start)).limit(Number(limit))
  ]);
  res.json({
    total,
    users
  });
};

const putUsers = async (req, res = response) => {
  const userId = req.params.userId;
  const { pwd, google, ...info } = req.body;

  if (pwd) {
    const salt = bcrypt.genSaltSync();
    info.pwd = bcrypt.hashSync(pwd, salt);
  }
  const user = await User.findByIdAndUpdate(userId, info);

  res.json({
    user
  });
};

const postUsers = async (req, res = response) => {
  const { name, mail, pwd, role } = req.body;
  const user = new User({ name, mail, pwd, role });

  // Encriptar la pwd EEROR
  const salt = bcrypt.genSaltSync();
  user.pwd = bcrypt.hashSync(pwd, salt);

  await user.save();
  res.json({
    user
  });
};

const patchUsers = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador'
  });
};

const deleteUsers = async (req, res = response) => {
  const { userId } = req.params;
  const user = await User.findByIdAndUpdate(userId, { state: false });

  res.json({ user });
};

module.exports = {
  getUsers,
  putUsers,
  deleteUsers,
  postUsers,
  patchUsers
};
