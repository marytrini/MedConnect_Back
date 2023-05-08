function serializeUser(passport) {
    passport.serializeUser(function (user, done) {

    })
}
function deserializeUser(passport) {
    //passport.deserializeUser()
}

function passportLocalStrategy(strategy) {
    new strategy({
        usernameField: "email"
    }, async function (email, password, done) {
        try {
            // if (!emaill || !password) throw new Error('Datos incorrectos o inexistentes')
            done(null, {id:1, email:"cuentaparaestudiosf@gmail.com"})
        } catch (error) {
            console.log(err)
            done(err, null)
        }
    })
}

module.exports = {
    serializeUser,
    deserializeUser,
    passportLocalStrategy
}