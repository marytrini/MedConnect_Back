const { User, Patient } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const userGet = async (req, res) => {
  try {
    const data = await User.findAll({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "role",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Patient,
          attributes: [
            "id",
            "firstName",
            "lastName",
            "phone",
            "email",
            "direccion",
            "dni",
            "observaciones",
          ],
        },
      ],
    });
    if (!data || data.length === 0) {
      return handleHttpError(res, "USUARIOS_NO_ENCONTRADOS");
    }

    const newData = data.map((user) => {
      if (user.role === "medico" || user.role === "admin") {
        const { patients, ...userWithoutPatients } = user.get({ plain: true });
        return userWithoutPatients;
      } else {
        return user;
      }
    });
    res.status(200).json(newData);
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_OBTENER_USUARIOS");
  }
};

const getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `No existe un usuario con id ${id}` });
    }

    let userData = null;

    if (user.role === "paciente") {
      userData = await User.findByPk(id, {
        include: [
          {
            model: Patient,
            attributes: ["firstName", "lastName", "phone"],
          },
        ],
      });
    } else {
      userData = user;
    }

    res.status(200).json(userData);
  } catch (error) {
    handleHttpError(res, "No existe un usuario con ese id", 404);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByPk(id);

    if (!deleted) {
      return handleHttpError(res, `Usuario con id ${id} no encontrado`);
    }
    await deleted.destroy();

    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};

module.exports = { userGet, getUserId, deleteUser };
