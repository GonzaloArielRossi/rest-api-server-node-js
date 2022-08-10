const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Categorie, Product } = require('../models');
const allowedCollections = ['categories', 'products', 'roles', 'users'];

const searchUsers = async (query, res = response) => {
  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const user = await User.findById(query);
    return res.json({
      results: user ? [user] : []
    });
  }

  const regex = new RegExp(query, 'i');

  const users = await User.find({
    $or: [{ nombre: regex }, { mail: regex }],
    $and: [{ state: true }]
  });
  return res.json({
    results: users
  });
};

const searchCategories = async (query, res = response) => {
  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const categorie = await Categorie.findById(query);
    return res.json({
      results: categorie ? [categorie] : []
    });
  }

  const regex = new RegExp(query, 'i');

  const categories = await Categorie.find({ nombre: regex, state: true });

  return res.json({
    results: categories
  });
};

const searchProducts = async (query, res = response) => {
  const isMongoId = ObjectId.isValid(query);

  if (isMongoId) {
    const product = await Product.findById(query).populate('categorie', 'name');
    return res.json({
      results: product ? [product] : []
    });
  }

  const regex = new RegExp(query, 'i');

  const products = await Product.find({
    $or: [{ nombre: regex }, { description: regex }],
    $and: [{ state: true }]
  }).populate('categorie', 'name');
  return res.json({
    results: products
  });
};

const search = (req, res = response) => {
  const { collection, query } = req.params;

  if (!allowedCollections.includes(collection)) {
    res.status(400).json({
      msg: `Las colecciones permitidas son ${allowedCollections}`
    });
  }
  switch (collection) {
    case 'categories':
      searchCategories(query, res);
      break;
    case 'products':
      searchProducts(query, res);
      break;
    case 'users':
      searchUsers(query, res);
      break;

    default:
      res.status(500).json({
        msg: 'Busqueda indefinida en el servidor'
      });
  }
};

module.exports = {
  search
};
