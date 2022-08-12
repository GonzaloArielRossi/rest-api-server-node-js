const { Categorie, User, Role, Product } = require('../models');

// Validadores Para Usuarios
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

// Validadores de categorias
const categorieIdExists = async (id) => {
  const categorieIdFound = await Categorie.findById(id);
  if (!categorieIdFound) {
    throw new Error('El id de categoria no existe');
  }
};

// Validadores de productos
const productIdExists = async (id) => {
  const productIdFound = await Product.findById(id);
  if (!productIdFound) {
    throw new Error('El id del producto no existe');
  }
};

const validateAllowedCollections = async (collection, collections) => {
  const included = collections.includes(collection);

  if (!included) {
    throw new Error(
      `La colección: ${collection} no es permitida. Colecciones válidas: ${collections}`
    );
  }
  return true;
};

module.exports = {
  categorieIdExists,
  isRoleValid,
  mailExists,
  productIdExists,
  userIdExists,
  validateAllowedCollections
};
