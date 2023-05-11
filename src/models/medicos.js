const { DataTypes } = require("sequelize");
const { hashPassword } = require("../middlewares/hashPassword");

module.exports = (sequelize) => {
  const Medico = sequelize.define(
    "medico",
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
      direccion: {
        type: DataTypes.STRING,
        //allowNull: false
        defaultValue: "Sin datos"
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },

      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'medic'
      }
    },
    {
      timestamps: false,
    }
  );
  hashPassword(Medico)
};
