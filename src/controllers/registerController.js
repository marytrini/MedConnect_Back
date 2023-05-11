const { createUser } = require("../middlewares/createUser");
const { Medico, Patient, Administrator } = require("../sequelize/sequelize");
const { Specialization } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const registerDataValidator = require("../validators/registerDataValidator");
const { validateAdminCreate, validateMedicCreate, notAllowed } = require("../validators/validateUserCreate");

async function registerController(req, res) {
    const { email, password, firstName, lastName, phone, role, userType } = req.body
    const userData = { email, password, firstName, lastName, phone, role, userType }
    // const canContinue = registerDataValidator(...userData)
   
    if (req.isAuthenticated()) {
        if (userType === "admin") {
            if (validateAdminCreate(req.user.role)) {
                return createUser(Administrator, userData, res)
            }
            else {
                return res.json(notAllowed)
            }
        }
        if (userType === "medic") {
            if (validateMedicCreate(req.user.role)) {
                return createUser(Medico, userData, res)
            } else {
                return res.json(notAllowed)
            }
        }
    } else {
        if (userType === "admin" || userType === "medic") {
            return res.json(notAllowed)
        } else {
            return createUser(Patient, userData, res)
        }
    }
}

module.exports = { registerController }


