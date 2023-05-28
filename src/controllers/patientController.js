const {
  Patient,
  Appointment,
  Medico,
  City,
} = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const { Op } = require("sequelize");

const getPatients = async (req, res) => {
  const { firstName } = req.query;
  try {
    if (!firstName) {
      const dataPatient = await Patient.findAll({
        include: [
          {
            model: Appointment,
            attributes: ["scheduledDate", "scheduledTime"],
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
      if (dataPatient.length === 0) {
        handleHttpError(res, "no existen pacientes en la base de datos", 404);
        return;
      }
      res.status(200).json(dataPatient);
    } else {
      const patientName = await Patient.findAll({
        where: {
          firstName: { [Op.iLike]: `%${firstName}%` },
        },
        include: [
          {
            model: Appointment,
            attributes: ["scheduledDate", "scheduledTime"],
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
      if (patientName.length === 0) {
        handleHttpError(res, "no existe un paciente con ese nombre", 404);
        return;
      }
      res.status(200).json(patientName);
    }
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Patient.findByPk(id, {
      include: [
        {
          model: Appointment,
          attributes: ["scheduledDate", "scheduledTime"],
          include: [
            {
              model: Medico,
              attributes: ["first_name", "last_name"],
            },
          ],
          attributes: {
            exclude: ["medicoId", "patientId"],
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
    if (!data) {
      return res
        .status(404)
        .json({ message: `No existe un paciente con id ${id}` });
    }

    res.status(200).json(data);
  } catch (error) {
    handleHttpError(res, "No existe un paciente con ese ID", 404);
  }
};

const createPatient = async (req, res) => {
  try {
    const { body } = req;
    // const newPatient = await Patient.create({
    //   firstName: body.firstName,
    //   lastName: body.lastName,
    //   phone: body.phone,
    //   direccion: body.direccion,
    //   cityId: body.cityId,
    // });
    const newPatient = await Patient.create(body);
    if (Object.keys(newPatient).length === 0) {
      handleHttpError(res, "Error al crear paciente", 404);
      return;
    }
    res.status(200).json(newPatient);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, phone, direccion } = req.body;

    const updated = await Patient.findByPk(id);

    if (!updated) res.status(404).json({ error: "No se encontró el paciente" });

    updated.firstName = firstName;
    updated.lastName = lastName;
    updated.phone = phone;
    updated.direccion = direccion;
    updated.email = email;
    updated.dni = dni;
    updated.observaciones = observaciones;
    await updated.save();

    res.status(200).json({ message: "¡Paciente actualizado exitosamente!" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPat = await Patient.findByPk(id);

    if (!deletedPat) {
      return handleHttpError(res, `paciente con el id ${id} no encontrado`);
    }
    await deletedPat.destroy();
    res.status(200).json({ message: "paciente eliminado" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
