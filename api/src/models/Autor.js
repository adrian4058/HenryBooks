const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Autor", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allownull: false,
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allownull: false,
    },
    lugar_nacimiento: {
      type: DataTypes.STRING,
      allownull: false,
    },
  });
};
