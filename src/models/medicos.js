const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "medico",
    {
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
