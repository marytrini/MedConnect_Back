const { createUser } = require("../middlewares/createUser");
const { Medico, Patient, Administrator } = require("../sequelize/sequelize");
const { Specialization } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const { validateAdminCreate, validateMedicCreate, notAllowed } = require("../validators/validateUserCreate");

async function registerController(req, res) {
    const { email, password, firstName, lastName, phone, role, userType } = req.body
    const userData = { email, password, firstName, lastName, phone, role, userType }
    if (req.isAuthenticated()) {
        if (userType === "admin" && validateAdminCreate(req.user.role)) {
            createUser(Administrator, userData, res)

        } else {
            return res.json(notAllowed)
        }
        if (userType === "medic" && validateMedicCreate(req.user.role)) {
            createUser(Medico, userData, res)

        } else {
            return res.json(notAllowed)
        }
    } else {
        if (userType === "admin" || userType === "medic") {
            return res.json(notAllowed)
        } else {
        }
    }
}

module.exports = { registerController }


