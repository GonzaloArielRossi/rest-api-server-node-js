const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role) => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error('No existe ese rol');
  }
};

const mailExists = async (mail) => {
  const mailFound = await User.findOne({ mail });
  if (mailFound) {
    throw new Error('El correo ya existe');
  }
};

const userIdExists = async (userId) => {
  const userIdFound = await User.findById(userId);
  if (!userIdFound) {
    throw new Error('El id no existe');
  }
};
module.exports = { isRoleValid, mailExists, userIdExists };
