const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "schedule",
    {
      day_of_week: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
