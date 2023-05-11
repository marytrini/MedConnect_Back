const { Router } = require('express')
const { userControllerGet } = require('../controllers/userController')
const { Medico, Patient, Administrator } = require('../sequelize/sequelize')
const { getUserData } = require('../middlewares/getUserData')

const user = Router()


user.get("/", async function (req, res) {
    if (req.isAuthenticated()) {
        const currentUser = req.user
        if (currentUser.role === "admin" || currentUser.role === "master") {
            const data = await getUserData(Administrator, currentUser.id)
            return res.json(data)
        }
        if (currentUser.role === "medic") {
            const data = await getUserData(Medico, currentUser.id)
            return res.json(data)
        }
        if (currentUser.role === "pacient") {
            const data = await getUserData(Patient, currentUser.id)
            return res.json(data)
        }

        return res.json("Los datos ingresados no son validos.")
    } else {
        return res.json('Unauthorized')
    }
})

module.exports = {
    user
}