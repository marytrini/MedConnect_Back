async function createUser(user, userData, res) {
    user.create(userData).then(user => {
        if (user) {
            return res.json("El usuario se ha registrado con exito.")
        } else return res.json("Ha habido un error al registrar el usuario, por favor reintente.")
    })
}

module.exports = {
    createUser
}
