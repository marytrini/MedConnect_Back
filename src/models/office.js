const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "office",
    {
      time_per_patient: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      consultation_fee: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
