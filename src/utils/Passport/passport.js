const localStrategy = require("passport-local");
const { Client } = require("../../sequelize/sequelize");

function useLocalStrategy() {
    return new localStrategy(function (username, password, done) {
        try {
            Client.findOne({
                where: {
                    username: username
                }
            }).then(user => {
                if (user) {
                    done(null, user)
                } else {
                    done("El usuario no existe")
                }
            })
        } catch (error) {
            done(error)
        }
    })
}


module.exports = {
    useLocalStrategy
}