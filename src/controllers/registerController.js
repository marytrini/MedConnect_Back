const { createUser } = require("../middlewares/createUser");
const { Medico, Patient, Administrator } = require("../sequelize/sequelize");
const { Specialization } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const { validateAdminCreate, validateMedicCreate, notAllowed } = require("../validators/validateUserCreate");
const { validationResult } = require('express-validator')
async function registerController(req, res) {
    const { email, password, firstName, lastName, phone, role, userType } = req.body
    const userData = { email, password, firstName, lastName, phone, role, userType }
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const response = errors.array().map(e => e = e.msg)

        return res.status(400).json(response.filter(function(err, index){
            return response.indexOf(err) === index
        }))
    }
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
        if (userType === "pacient") {

            if (!!req.user.role) {
                return createUser(Patient, userData, res)
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


