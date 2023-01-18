const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Libro", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allownull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allownull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allownull: false,
    },
    editorial: {
      type: DataTypes.STRING,
      defaultValue: "No disponible",
    },
    reviews: {
      type: DataTypes.ARRAY(DataTypes.JSON),
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
  });
};
