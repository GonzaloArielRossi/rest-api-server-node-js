const { response } = require('express');
const { uploadFile } = require('../helpers');

const uploadFiles = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({
      msg: 'No files were uploaded.'
    });
    return;
  }

  try {
    const fileName = await uploadFile(req.files, 'audioFile');
    res.json({ fileName });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

module.exports = {
  uploadFiles
};
