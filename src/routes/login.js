const { Router } = require('express')
const { loginController } = require('../controllers/loginController')
const { authenticate } = require('../validators/AuthValidator')

const login = Router()

login.post("/", authenticate(), loginController)


login.get("/", function(req,res){
    if (req.isAuthenticated()) {
        res.send('Logeado')
    } else {
        res.send('sin permisos')
    }
})

module.exports = {
    login
}