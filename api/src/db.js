require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
// const pg = require("pg");
const path = require("path");
<<<<<<< HEAD
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;
=======
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
>>>>>>> main

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henrybooks`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
<<<<<<< HEAD
const { Usuario, Libro, Autor, Resena } = sequelize.models;
=======
const { Usuario, Libro, Autor } = sequelize.models;
>>>>>>> main

//relaciones
Usuario.belongsToMany(Libro, { through: "Usuarios_libros" });
Libro.belongsToMany(Usuario, { through: "Usuarios_libros" });
Autor.hasMany(Libro);
Libro.belongsTo(Autor);
<<<<<<< HEAD
Libro.hasMany(Resena);
Resena.belongsTo(Libro);
Usuario.hasMany(Resena);
Resena.belongsTo(Usuario);
=======
>>>>>>> main

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
  Op, // para importart la conexión { conn } = require('./db.js');
};
