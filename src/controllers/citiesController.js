const { City } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const createCity = async (req, res) => {
  try {
    const { body } = req;
    const data = await City.bulkCreate(body);
    res.status(201).json(data);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

module.exports = { createCity };
