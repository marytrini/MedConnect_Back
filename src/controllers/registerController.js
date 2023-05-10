const { Client } = require("../sequelize/sequelize");
const { Specialization } = require("../sequelize/sequelize");
const { handleHttpError } = require("../utils/handleError");
const registerDataValidator = require("../validators/registerDataValidator");

async function registerController(req, res) {
    const { username, password, email, name, last_name } = req.body
    try {
        let canRegister = registerDataValidator(username, password, email, name, last_name)
        if (canRegister === true) {
            Client.create({
                username,
                password,
                email,
                name,
                last_name
            }).then(user => {
                if (user) {
                    res.json("El usuario se ha registrado con éxito.")
                } else {
                    res.json("Se ha producido un error, Intente mas tarde")
                }
            })
        }
    } catch (error) {
        handleHttpError(res)
    }
}

module.exports = { registerController }