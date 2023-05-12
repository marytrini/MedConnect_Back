const { Medico, Specialization, City } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const getMedics = async (req, res) => {
  try {
    const data = await Medico.findAll({
      include: [
        {
          model: Specialization,
          attributes: ["name"],
          through: {
            //tabla intermedia
            attributes: [],
          },
        },
        {
          model: City,
          attributes: ["name"],
        },
      ],
      attributes: {
        exclude: ["cityId"],
      },
    });
    if (data.length === 0) {
      handleHttpError(res, "no existe medicos en la base de datos", 404);
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const createMedic = async (req, res) => {
  try {
    const { body } = req;
    const newMedic = await Medico.create({
      first_name: body.first_name,
      last_name: body.last_name,
      phone: body.phone,
      direccion: body.direccion,
      cityId: body.cityId,
    });

    newMedic.addSpecializations(body.specializations.map((el) => Number(el)));
    if (Object.keys(newMedic).length === 0) {
      handleHttpError(res, "Error al craer medicos", 404);
      return;
    }
    res.status(200).json(newMedic);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

module.exports = { createMedic, getMedics };
