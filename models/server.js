const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads',
      users: '/api/users'
    };

    // Conectar a DB
    this.dbConnect();
    // Middlewares
    this.middlewares();
    //Rutas
    this.routes();
  }

  async dbConnect() {
    await dbConnection();
  }
  middlewares() {
    //CORS
    this.app.use(cors());
    //Read and Parse Body
    this.app.use(express.json());
    // Directorio Publico
    this.app.use(express.static('public'));

    // Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true
      })
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening to port...  ${this.port}`);
    });
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.search, require('../routes/search'));
    this.app.use(this.paths.uploads, require('../routes/uploads'));
    this.app.use(this.paths.users, require('../routes/users'));
  }
}

module.exports = Server;
