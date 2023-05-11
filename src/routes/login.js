const { Router } = require('express')
const { loginController } = require('../controllers/loginController')
const passport = require('passport')

const login = Router()

login.post("/", function (req, res, next) {



    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user.type) { return res.status(400).json({ message: "El tipo de usuario no es valido." }) }
        if (!user) {
            return res.status(400).json({ message: 'Debe completar los campos requridos' });
        }

        // log in the user
        return res.json({
            user: req.user,
            access_token: req.logIn(user, function (err) {
                if (err) return next(err)
            }),
            message: "Te has logeado correctamente"
        });

    })(req, res, next);

}, loginController)


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