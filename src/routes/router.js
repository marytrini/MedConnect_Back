const { Router } = require("express");
const specializations = require("./specializations.js");
const { register } = require("./register.js");
const { login } = require("./login.js");
const { Medico, Patient, Administrator } = require("../sequelize/sequelize.js");

const router = Router();

router.get("/", async function (req, res) {
    const adminData = await Administrator.findAll()
    const medicData = await Medico.findAll()
    const patientData = await Patient.findAll()

    res.json({
        adminData: adminData,
        medicData: medicData,
        patientData: patientData
    })
    // if (req.isAuthenticated()) {
    //     res.send('Server Online')

    // } else {
    //     res.send("unauthorized")
    // }
})

router.use("/register", register);
router.use("/login", login);

router.use("/", specializations);

module.exports = {
    router,
};
