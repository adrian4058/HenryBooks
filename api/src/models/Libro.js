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
