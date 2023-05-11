const { Router } = require("express");
const specializations = require("./specializations.js");
const { register } = require("./register.js");
const { login } = require("./login.js");
const { Medico, Patient, Administrator } = require("../sequelize/sequelize.js");

const router = Router();
const appointment = require("./appointment.js");
const { logout } = require("./logout.js");
router.get("/", async function (req, res) {
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    const adminData = await Administrator.findAll()
    const medicData = await Medico.findAll()
    const pacientData = await Patient.findAll()
    res.json([adminData, medicData, pacientData])
  } else {
    res.send("unauthorized");
  }
});

router.use("/register", register);
router.use("/login", login);
router.use("/logout", logout);


router.use("/specializations", specializations);
router.use("/appointment", appointment);

module.exports = {
  router,
};
