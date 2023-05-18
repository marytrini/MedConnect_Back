const { Router } = require("express");

const router = Router();

const specializations = require("./specializations.js");
const appointment = require("./appointment.js");
const patients = require("./patients.js");
const medics = require("./medics.js");
const cities = require("./cities.js");
const medicoCalification = require("./medico-calification.js");
const medicalSchedule = require("./medicalSchedule.js");
const auth = require("./auth.js");

router.use("/specializations", specializations);
router.use("/appointment", appointment);
router.use("/medics", medics);
router.use("/cities", cities);
router.use("/medicoCalification", medicoCalification);
router.use("/schedule", medicalSchedule);
router.use("/patients", patients);
router.use("/auth", auth);

module.exports = {
  router,
};
