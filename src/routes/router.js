const { Router } = require("express");
const specializations = require("./specializations.js");
const { register } = require("./register.js");
const { login } = require("./login.js");
const { Medico, Patient, Administrator } = require("../sequelize/sequelize.js");

const router = Router();
const appointment = require("./appointment.js");
const patients = require("./patients.js");
const medics = require("./medics.js");
const cities = require("./cities.js");
const medicoCalification = require("./medico-calification.js");

const { logout } = require("./logout.js");
const { user } = require("./user.js");
router.get("/", async function (req, res) {
  console.log(req.isAuthenticated());

  if (req.isAuthenticated()) {
    const adminData = await Administrator.findAll();
    const medicData = await Medico.findAll();
    const pacientData = await Patient.findAll();
    res.json([adminData, medicData, pacientData]);
  } else {
    res.send("unauthorized");
  }
});

//basilorien
router.use("/register", register);
router.use("/login", login);
router.use("/logout", logout);
//basilorien endpoints
router.use("/user", user);

router.use("/specializations", specializations);
router.use("/appointment", appointment);
router.use("/medics", medics);
router.use("/cities", cities);
router.use("/medicoCalification", medicoCalification);

router.use("/patients", patients);

module.exports = {
  router,
};
