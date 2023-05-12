const { City } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const getCities = async (req, res) => {
  try {
    const data = await City.findAll();
    if (!data || data.length === 0) {
      handleHttpError(res, "No existe ciudades en la base de datos");
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};
const createCity = async (req, res) => {
  try {
    const { body } = req;
    const data = await City.bulkCreate(body);
    res.status(201).json(data);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

module.exports = { createCity, getCities };
