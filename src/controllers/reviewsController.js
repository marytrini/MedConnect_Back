const { User, Patient } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const createReview = async (req, res) => {
  try {
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

module.exports = { createReview };
