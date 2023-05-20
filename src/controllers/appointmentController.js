const {
  Appointment,
  Medico,
  Patient,
  Specialization,
} = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const getAppointment = async (req, res) => {
  try {
    const citas = await Appointment.findAll({
      include: [
        {
          model: Medico,
          attributes: ["id", "first_name", "last_name"],
          include: [
            {
              model: Specialization,
              attributes: ["name"],
              through: { attributes: [] }, // Excluye la tabla intermedia
            },
          ],
        },
        {
          model: Patient,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
      attributes: {
        exclude: ["medicoId", "patientId"],
      },
    });

    if (citas) {
      res.status(200).json(citas);
    } else {
      handleHttpError(res, "No existe la cita", 404);
    }
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const createAppointment = async (req, res) => {
  try {
    const { body } = req;

    const newAppointment = await Appointment.create({
      scheduledDate: body.scheduledDate,
      scheduledTime: body.scheduledTime,
      status: body.status,
      medicoId: body.medicoId,
      patientId: body.patientId,
    });

    if (newAppointment) {
      res.status(200).json({ message: "¡Cita creada exitosamente!" });
    } else {
      handleHttpError(res, "Error al crear la cita", 404);
    }
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { scheduledDate, scheduledTime, status } = req.body;

    const cita = await Appointment.findByPk(id);

    if (!cita) res.status(404).json({ error: "No se encontró la cita" });

    cita.scheduledDate = scheduledDate;
    cita.scheduledTime = scheduledTime;
    cita.status = status;
    await cita.save();

    res.status(200).json({ message: "¡Cita actualizada exitosamente!" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return handleHttpError(res, `cita con ${id} no encontrada`, 404);
    }
    await appointment.destroy();
    res.status(200).json({ message: "cita eliminada" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};

module.exports = {
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
