const { Router } = require('express')
const { registerController } = require('../controllers/registerController')
const register = Router()
const { body } = require('express-validator')
// password, firstName, lastName, phone, userType
register.post("/", [
    body("email", "Ingrese un email valido").exists().isLength().isEmail(),
    body("password", "Ingrese una contraseña con al menos un numero y una mayúscula").exists().isLength().isStrongPassword({ minSymbols: 0, minUppercase: 1, minNumbers: 1 }),
    body('firstName', "Ingrese un nombre.").exists().isLength(),
    body('lastName', "Ingrese un apellido.").exists().isLength(),
    body('phone', "Ingrese un numero de telefono.").exists().isLength(),
    body('userType', "Ingrese un tipo de usuario válido").exists().isLength().isIn(["pacient", "admin", "medic"])

], registerController)

module.exports = {
    register
}