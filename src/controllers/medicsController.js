const {
  Medico,
  Specialization,
  City,
  MedicoCalification,
} = require("../sequelize/sequelize");
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
        {
          model: MedicoCalification,
          attributes: [
            "academic_degree",
            "years_of_experience",
            "certifications",
            "research",
          ],
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

const getMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Medico.findByPk(id, {
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
        {
          model: MedicoCalification,
          attributes: [
            "academic_degree",
            "years_of_experience",
            "certifications",
            "research",
          ],
        },
      ],
      attributes: {
        exclude: ["cityId"],
      },
    });

    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};
const deleteMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Medico.findByPk(id);
    if (!data) {
      handleHttpError(res, `medico with ID ${id} not found`, 404);

      await data.destroy();
    }
    res.status(201).json({ message: "medico borrado" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};

module.exports = { createMedic, getMedics, getMedic, deleteMedic };
