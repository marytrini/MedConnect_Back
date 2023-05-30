const { MedicoCalification } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const getMedicsCalification = async (req, res) => {
  try {
    const calification = await MedicoCalification.findAll();

    if (!calification) {
      handleHttpError(res, "No existe calificación para este médico", 404);
    }

    res.status(200).json(calification);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const createMedicoCalification = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const data = await MedicoCalification.create(body);
    if (!data || data.length === 0) {
      handleHttpError(res, "No existe datos de calificaciones medicas");
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

module.exports = { createMedicoCalification, getMedicsCalification };
