const {
  Appointment,
  Medico,
  Patient,
  Specialization,
  User,
} = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const transporter = require("../config/mailer");

const getAppointment = async (req, res) => {
  try {
    const citas = await Appointment.findAll({
      include: [
        {
          model: Patient,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: User,
          where: {
            role: "medico",
          },
          attributes: {
            exclude: ["password"],
          },
        },
      ],
      attributes: {
        exclude: ["userId", "patientId"],
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
      userId: body.userId,
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

    const cita = await Appointment.findByPk(id, {
      include: [
        {
          model: Patient,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    if (!cita) res.status(404).json({ error: "No se encontró la cita" });

    cita.scheduledDate = scheduledDate;
    cita.scheduledTime = scheduledTime;
    cita.status = status;
    await cita.save();

    // const pacienteData = await Appointment.findByPk(id);

    if (cita.status !== "pending") {
      await transporter.sendMail({
        from: '"Medconnect" <services.medconnect@gmail.com>', // sender address
        to: cita.patient.email, // list of receivers
        subject: "Nos encantaría conocer tu opinión sobre nuestro servicio", // Subject line
        // text: "Gracias por registrarte en nuestra aplicación. Esperamos que disfrutes de tu experiencia.", // plain text body
        html: `
<html>
<head>
    <meta charset="UTF-8">
    <title>Feedback de Medconnect</title>
</head>
<body>
    <p>Estimado(a) cliente,</p>
    <p>Esperamos que estés disfrutando de los servicios de Medconnect y que estemos cumpliendo con tus expectativas. Nos gustaría aprovechar esta oportunidad para invitarte a compartir tu experiencia con nosotros y ayudarnos a crecer.</p>
    <p>Tu opinión es esencial para nuestro equipo, ya que nos permite evaluar nuestra calidad de servicio y nos brinda información valiosa para tomar decisiones informadas. Nos encantaría conocer tus comentarios, sugerencias y cualquier idea que puedas tener para mejorar.</p>
    <p>Por favor, tómate unos minutos para completar nuestra breve encuesta de satisfacción. Tu participación nos ayudará a seguir ofreciendo servicios de excelencia y adaptados a tus necesidades.</p>
    <p><a href="http://localhost:3000/reviews">Haz clic aquí para completar la encuesta</a></p>
    <p>Agradecemos sinceramente tu tiempo y apreciamos tu colaboración. Si tienes alguna pregunta o necesitas asistencia adicional, nuestro equipo de atención al cliente está aquí para ayudarte.</p>
    <p>¡Esperamos recibir tus comentarios y seguir trabajando juntos para proporcionarte la mejor experiencia posible con Medconnect!</p>
    <p>Atentamente,<br>El equipo de Medconnect</p>
</body>
</html>

        `,
      });
    }

    res.status(200).json(cita);
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
