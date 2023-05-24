const { Schedule, Medico } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");

const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findAll({
      include: [
        {
          model: Medico,
          attributes: ["phone", "direccion"],
        },
      ],
      attributes: {
        exclude: ["medicoId"],
      },
    });
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      handleHttpError(res, "No existe el horario", 404);
    }
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const createSchedule = async (req, res) => {
  try {
    const { body } = req;
    const newSchedule = await Schedule.create({
      day_of_week: body.day_of_week,
      start_time: body.start_time,
      end_time: body.end_time,
      medicoId: body.medicoId,
    });
    if (newSchedule) {
      res.status(200).json({ message: "¡Horario creado exitosamente!" });
    } else {
      handleHttpError(res, { error: "Error al crear horario" }, 404);
    }
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { day_of_week, start_time, end_time, medicoId } = req.body;

    const scheduleUpdate = await Schedule.findByPk(id);

    if (!scheduleUpdate)
      res.status(404).json({ error: "No se encontró el horario" });

    scheduleUpdate.day_of_week = day_of_week;
    scheduleUpdate.start_time = start_time;
    scheduleUpdate.end_time = end_time;
    scheduleUpdate.medicoId = medicoId;
    await scheduleUpdate.save();

    res.status(200).json({ message: "¡Horario actualizado con éxito!" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 500);
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return handleHttpError(res, `Horario con ${id} no encontrado`, 404);
    }
    await schedule.destroy();
    res.status(200).json({ message: "Horario eliminado" });
  } catch (error) {
    handleHttpError(res, { error: error.message }, 404);
  }
};

module.exports = {
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
