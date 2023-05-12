const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../middlewares/hashPassword");
module.exports = (sequelize) => {
  const Patient = sequelize.define(
    "patient",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  hashPassword(Patient);
};
