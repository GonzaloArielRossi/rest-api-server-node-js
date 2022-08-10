const { response } = require('express');
const { Product, Categorie } = require('../models');

//getProducts - paginado - total - populate para mostrar nombre basado en el id
const getProducts = async (req, res = response) => {
  const { limit, start } = req.query;
  const query = { state: true };

  //EJECUTAR AMBAS QUERYS AL MISMO TIEMPO
  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('categorie', 'name')
      .skip(Number(start))
      .limit(Number(limit))
  ]);
  res.json({
    total,
    products
  });
};

//getProduct by id - populate
const getProduct = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('categorie', 'name');
  res.json(product);
};

//actualizar producto - por nombre
const updateProduct = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  if (data.nombre) {
    data.name = data.name.toUpperCase();
  }
  data.user = req.user._id;
  product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};

//borrar categoria por id estado:false
const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  updatedProduct = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  return res.json(updatedProduct);
};

// middleware de validar id de categoria para sumar a las routes
//añadir a db validators helpers check('id').custom(productExists)

const createProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name.toUpperCase() });
  console.log(productDB);
  if (productDB) {
    return res.status(400).json({
      msg: 'El producto ya existe'
    });
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id
  };

  const product = new Product(data);
  // Guardar categoria en DB
  await product.save();

  res.status(201).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProduct
};
