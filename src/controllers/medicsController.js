const {
  Medico,
  Specialization,
  City,
  MedicoCalification,
  Schedule,
  User,
} = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const { Op } = require("sequelize");

const getMedics = async (req, res) => {
  const { first_name } = req.query;
  try {
    const data = await Medico.findAll({
      include: [
        {
          model: User, // Incluir la tabla Usuario
          where: { role: "medico" }, // Filtrar por el rol de "médico"
        },
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
        exclude: ["cityId", "scheduleId", "userId"],
      },
    });
    if (first_name) {
      const medicName = await data.filter((medic) =>
        medic.user.first_name.toLowerCase().includes(first_name.toLowerCase())
      );
      medicName.length
        ? res.status(200).json(medicName)
        : handleHttpError(res, "No existe el medico con ese nombre", 404);
    } else {
      res.status(200).json(data);
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
      userId: body.userId,
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
    const data = await Medico.findAll({
      include: [
        {
          model: User, // Incluir la tabla Usuario
          where: { role: "medico" }, // Filtrar por el rol de "médico"
        },
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
        exclude: ["cityId", "scheduleId", "userId"],
      },
    });
    const dataById = data.find((medic) => medic.user.id === id);
    if (!dataById) {
      return res
        .status(404)
        .json({ message: `No existe un médico con id ${id}` });
    }

    res.status(200).json(dataById);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};

const updateMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const { phone, direccion, specializations, cityId } = req.body;

    const updatedMedic = await Medico.findByPk(id);

    if (!updatedMedic)
      res.status(404).json({ error: "No se encontró el médico" });

    updatedMedic.phone = phone;
    updatedMedic.direccion = direccion;
    updatedMedic.cityId = cityId;
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

module.exports = { createMedic, getMedics, getMedic, updateMedic };
