const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "appointment",
    {
      scheduledDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      scheduledTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      registeredDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      timestamps: false,
    }
  );
};
