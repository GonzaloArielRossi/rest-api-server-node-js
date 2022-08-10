const { response } = require('express');
const { Categorie } = require('../models');

//getCategories - paginado - total - populate para mostrar nombre basado en el id
const getCategories = async (req, res = response) => {
  const { limit, start } = req.query;
  const query = { state: true };

  //EJECUTAR AMBAS QUERYS AL MISMO TIEMPO
  const [total, categories] = await Promise.all([
    Categorie.countDocuments(query),
    Categorie.find(query)
      .populate('user', 'name')
      .skip(Number(start))
      .limit(Number(limit))
  ]);
  res.json({
    total,
    categories
  });
};

//getCategorie - populate
const getCategorie = async (req, res = response) => {
  const { id } = req.params;
  const categorie = await Categorie.findById(id).populate('user', 'name');
  res.json(categorie);
};

//actualizar categoria - por nombre
const updateCategorie = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;
  categorie = await Categorie.findByIdAndUpdate(id, data, { new: true });

  res.json(categorie);
};

//borrar categoria por id estado:false
const deleteCategorie = async (req, res = response) => {
  const { id } = req.params;

  updatedCategorie = await Categorie.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );
  return res.json(updatedCategorie);
};

// middleware de validar id de categoria para sumar a las routes
//añadir a db validators helpers check('id').custom(categorieExists)

const createCategorie = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  const categorieDB = await Categorie.findOne({ name });

  if (categorieDB) {
    return res.status(400).json({
      msg: 'La categoria ya existe'
    });
  }

  const data = {
    name,
    user: req.user._id
  };

  const categorie = new Categorie(data);

  // Guardar categoria en DB
  await categorie.save();

  res.status(201).json(categorie);
};

module.exports = {
  createCategorie,
  getCategories,
  getCategorie,
  updateCategorie,
  deleteCategorie
};
