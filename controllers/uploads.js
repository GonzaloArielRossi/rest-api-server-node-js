const { response } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFiles = async (req, res = response) => {
  try {
    const fileName = await uploadFile(req.files, 'audioFile', '');
    res.json({ fileName });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

// const updateImage = async (req, res = response) => {
//   const { collection, id } = req.params;

//   let model;

//   switch (collection) {
//     case 'users':
//       model = await User.findById(id);
//       if (!model) {
//         return res.status(401).json({
//           msg: 'El usuario no existe'
//         });
//       }
//       break;

//     case 'products':
//       model = await Product.findById(id);
//       if (!model) {
//         return res.status(401).json({
//           msg: 'El producto no existe'
//         });
//       }
//       break;

//     default:
//       return res
//         .status(500)
//         .json({ msg: 'Error interno del servidor al actualizar la imagen' });
//   }

//   // Delete old image
//   if (model.img) {
//     //borrar la imagen del servidor
//     const imagePath = path.join(
//       __dirname,
//       '../uploads',
//       'Image Files',
//       collection,
//       model.img
//     );
//     if (fs.existsSync(imagePath)) {
//       fs.unlinkSync(imagePath);
//     }
//   }

//   try {
//     model.img = await uploadFile(req.files, 'imageFile', collection);
//     await model.save();
//   } catch (err) {
//     res.json({ err });
//   }

//   res.json(model);
// };

const updateImage = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(401).json({
          msg: 'El usuario no existe'
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(401).json({
          msg: 'El producto no existe'
        });
      }
      break;

    default:
      return res
        .status(500)
        .json({ msg: 'Error interno del servidor al actualizar la imagen' });
  }

  // Delete old image
  if (model.img) {
    //borrar la imagen del servidor
    const splitedPath = model.img.split('/');
    const imageName = splitedPath[splitedPath.length - 1];
    const [publicImageId] = imageName.split('.');
    cloudinary.uploader.destroy(publicImageId);
  }

  try {
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    model.img = secure_url;
    await model.save();
    return res.json(model);
  } catch (err) {
    return res.json({ err });
  }
};

const getImage = async (req, res = response) => {
  const { collection, id } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(401).json({
          msg: 'El usuario no existe'
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(401).json({
          msg: 'El producto no existe'
        });
      }
      break;

    default:
      return res
        .status(500)
        .json({ msg: 'Error interno del servidor al actualizar la imagen' });
  }

  if (model.img) {
    const imagePath = path.join(
      __dirname,
      '../uploads',
      'Image Files',
      collection,
      model.img
    );
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
  }
  placeholder = path.join(__dirname, '../assets', 'placeholder.jpg');
  return res.sendFile(placeholder);
};

module.exports = {
  getImage,
  uploadFiles,
  updateImage
};
