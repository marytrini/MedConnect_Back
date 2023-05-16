const { Patient, Appointment, City } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const { Op } = require("sequelize");

const getPatients = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const dataPatient = await Patient.findAll({
        include: [
          // {
          //   model: Appointment,
          //   attributes: ["scheduledDate", "scheduledTime", "registeredDate"],
          // },
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
          name: { [Op.iLike]: name },
        },
        include: [
          // {
          //   model: Appointment,
          //   attributes: ["scheduledDate", "scheduledTime", "registeredDate"],
          // },
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
        // {
        //   model: Appointment,
        //   attributes: ["scheduledDate", "scheduledTime", "registeredDate"],
        // },
        {
          model: City,
          attributes: ["name"],
        },
      ],
      attributes: {
        exclude: ["cityId"],
      },
    });
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

module.exports = { getPatients, getPatient, createPatient };
