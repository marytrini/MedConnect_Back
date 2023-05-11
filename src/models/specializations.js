const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "specialization",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      url: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
