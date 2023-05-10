const { Specialization } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const createSpecializations = async (req, res) => {
  try {
    const { body } = req;
    const data = await Specialization.bulkCreate(body);

    res.status(201).json({ data });
  } catch (error) {
    handleHttpError(res, "La especialidad ya existe en la base de datos", 500);
  }
};

module.exports = { createSpecializations };
