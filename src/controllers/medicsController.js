const {
  Medico,
  Specialization,
  City,
  MedicoCalification,
  Schedule,
} = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const { Op } = require("sequelize");

const getMedics = async (req, res) => {
  const { first_name } = req.query;
  try {
    if (!first_name) {
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
          {
            model: Schedule,
            attributes: ["day_of_week", "start_time", "end_time"],
          },
        ],
        attributes: {
          exclude: ["cityId", "scheduleId"],
        },
      });

      if (data.length === 0) {
        handleHttpError(res, "no existen medicos en la base de datos", 404);
        return;
      }
      res.status(200).json(data);
    } else {
      const medicName = await Medico.findAll({
        where: {
          first_name: { [Op.iLike]: `%${first_name}%` },
        },
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
      if (medicName.length === 0) {
        handleHttpError(res, "no se encontró el médico", 404);
        return;
      }
      res.status(200).json(medicName);
    }
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
      handleHttpError(res, "Error al crear medicos", 404);
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
    if (!data) {
      return res
        .status(404)
        .json({ message: `No existe un médico con id ${id}` });
    }

    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};

const updateMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone, direccion, specializations } =
      req.body;

    const updatedMedic = await Medico.findByPk(id);

    if (!updatedMedic)
      res.status(404).json({ error: "No se encontró el médico" });

    updatedMedic.first_name = first_name;
    updatedMedic.last_name = last_name;
    updatedMedic.phone = phone;
    updatedMedic.direccion = direccion;
    await updatedMedic.save();

    const medicSpecialization = await Specialization.findAll({
      where: {
        id: specializations,
      },
    });
    if (!medicSpecialization) {
      return res.status(404).json({ error: "Especialidad no encontrada" });
    }
    await updatedMedic.setSpecializations(medicSpecialization);

    res.status(200).json({ message: "¡Médico actualizado exitosamente!" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
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
    res.status(201).json({ message: "medico eliminado" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};

module.exports = { createMedic, getMedics, getMedic, updateMedic, deleteMedic };
