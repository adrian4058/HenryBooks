const { DataTypes, UUIDV4, UUID } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Libro", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allownull: false,
    },

    editorial: {
      type: DataTypes.STRING,
      defaultValue: "No disponible",
    },
    image: {
      type: DataTypes.STRING,
      allownull: false,
      defaultValue:
        "https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg?w=740&t=st=1689692784~exp=1689693384~hmac=ada0b00f4a3f6b3a95f6837fd806596c31b9c690ed83d71d74d87093775009ac",
    },
    genero: {
      type: DataTypes.STRING,
      allownull: false,
    },
    stock: {
      type: DataTypes.FLOAT,
      allownull: false,
      validate: {
        min: 0,
        max: 1000,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allownull: false,
    },
    estado: {
      type: DataTypes.ENUM("activo", "desactivado"),
      allownull: false,
      defaultValue: "activo",
    },
  });
};
