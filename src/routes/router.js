const { Router } = require('express')
const specializations = require('./specializations.js')
const { register } = require('./register.js')
const router = Router()


router.get("/", function (req, res) {
    res.send('Server Online')
})


router.use("/register", register)

router.use('/specializations', specializations)

module.exports = {
    router
}