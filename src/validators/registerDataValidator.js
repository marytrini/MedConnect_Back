const { Client } = require("../sequelize/sequelize");


module.exports = function registerDataValidator(username, password, email, name, last_name, active) {
    let error = null;
    const mailFormat = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    //username
    if (!username || typeof username !== 'string' || username.length > 20) {
        return error = "Nombre de usuario no válido"
    }

    //password
    if (!password
        || typeof password !== 'string'
        || !passwordFormat.test(password)
        || password.length > 20) {
        return error = "Contraseña no válida"
    }

    //mail

    if (!email || typeof email !== 'string' || !mailFormat.test(email)) {
        return error = "Email no válido"
    }

    //name
    if (!name || typeof name !== 'string' || name.length > 50) {
        return error = "Nombre no válido"
    }
    //lastname
    if (!last_name || typeof last_name !== 'string' || last_name.length > 50) {
        return error = "Apellido no válido"
    }


   return Client.findOne({
        where: { username: username }
    }).then(user => {
        if (user) {
           return error = `El usuario ${user.basilorien} ya existe, por favor inicia sesion.`
        } else return true
    })


}