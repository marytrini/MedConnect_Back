const { authenticate } = require("../validators/AuthValidator");
const passport = require('passport')

function loginController(req, res) {
   res.send('log')
}

module.exports = {
    loginController
}