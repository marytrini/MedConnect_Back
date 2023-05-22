const { User } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const userGet = async (req, res) => {
  try {
    const data = await User.findAll();
    if (!data || data.length === 0) {
      return handleHttpError(res, "USUARIOS_NO_ENCONTRADOS");
    }
    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, "ERROR_OBTENER_USUARIOS");
  }
};

const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await User.findByPk(id, {});
  } catch (error) {}
};

module.exports = { userGet };
