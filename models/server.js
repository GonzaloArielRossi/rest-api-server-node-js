const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = '/api/auth';
    this.usersPath = '/api/users';

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
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Listening to port...  ${this.port}`);
    });
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usersPath, require('../routes/users'));
  }
}

module.exports = Server;
