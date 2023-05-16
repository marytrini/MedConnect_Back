const { Appointment, Medico, Patient } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const getAppointment = async () => {
  try {
    const citas = await Appointment.findAll({
      include: [
        {
          model: Medico,
          attributes: ["first_name", "last_name"],
        },
        {
          model: Patient,
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    citas.length
      ? res.status(200).json(citas)
      : handleHttpError(res, "No existe la cita", 404);
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};
