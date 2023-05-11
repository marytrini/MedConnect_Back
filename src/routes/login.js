const { Router } = require('express')
const { loginController } = require('../controllers/loginController')
const passport = require('passport')

const login = Router()

login.post("/", passport.authenticate('local', { failureMessage: "Error al iniciar sesion." }), loginController)


login.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        res.send('Logeado')
    } else {
        res.send('sin permisos')
    }
})

module.exports = {
    login
}