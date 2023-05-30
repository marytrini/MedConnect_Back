const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "patientsReview",
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recommend: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};
