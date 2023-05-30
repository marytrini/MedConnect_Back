const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "medicoCalification",
    {
      academic_degree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      years_of_experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      certifications: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      research: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
