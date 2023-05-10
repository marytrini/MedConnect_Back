const passport = require('passport')
function authenticate() {
    return passport.authenticate('local', { failureMessage: "Error al iniciar sesion" })
}

module.exports = {
    authenticate
}

