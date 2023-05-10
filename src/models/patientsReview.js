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
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      recommend: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      reviewDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
