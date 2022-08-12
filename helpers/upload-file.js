const { v4: uuid } = require('uuid');
const path = require('path');

const formats = {
  textFile: {
    allowedExtensions: ['txt', 'md'],
    folderName: 'Text Files'
  },
  imageFile: {
    allowedExtensions: ['jpeg', 'jpg', 'png', 'gif'],
    folderName: 'Image Files'
  },
  documentFile: {
    allowedExtensions: ['doc', 'docx', 'pdf', 'rtf'],
    folderName: 'Document Files'
  },
  videoFile: {
    allowedExtensions: ['mp4', 'mov', '3gp', 'avi'],
    folderName: 'Video Files'
  },
  audioFile: {
    allowedExtensions: ['mp3', 'wav', 'aac'],
    folderName: 'Audio Files'
  }
};

const uploadFile = (files, fileFormat, directory) => {
  return new Promise((resolve, reject) => {
    const extensions = formats[fileFormat];
    const folderName = `${extensions.folderName}`;

    //Extraer Extension del archivo
    const { file } = files;
    const splitedName = file.name.split('.');
    const fileExtension = splitedName[splitedName.length - 1];

    // Validate Extension
    if (!extensions.allowedExtensions.includes(fileExtension)) {
      return reject(
        `Extension: ${fileExtension} no válida. Extensiones permitidas: ${extensions.allowedExtensions}`
      );
    }
    tempFileName = `${uuid()}.${fileExtension}`;
    const uploadPath = path.join(
      __dirname,
      '../uploads/',
      folderName,
      directory,
      tempFileName
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(tempFileName);
    });
  });
};

module.exports = {
  uploadFile
};
