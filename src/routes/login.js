const { Router } = require('express')
const { loginController } = require('../controllers/loginController')
const passport = require('passport')
const { body, validationResult } = require('express-validator')
const login = Router()

login.post("/", [
    body("email", "Ingrese un email valido").exists().isLength().isEmail(),
    body("password", "Ingrese una contraseña con al menos un numero y una mayúscula").exists().isLength().isStrongPassword({ minSymbols: 0, minUppercase: 1, minNumbers: 1 }),
], function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const response = errors.array().map(e => e = e.msg)

        return res.status(400).json(response.filter(function (err, index) {
            return response.indexOf(err) === index
        }))
    }

    return next()
}, passport.authenticate('local', { failureMessage: "Error al iniciar sesion." }), loginController)

module.exports = {
    login
}