const { Router } = require('express')
const logout = Router()

logout.post('/', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.json({ message: "Has cerrado sesion" });
    });
});

module.exports = {
    logout
}