const localStrategy = require("passport-local");
const { Medico, Patient, Administrator } = require("../../sequelize/sequelize");

function useLocalStrategy() {
    return new localStrategy(
        { usernameField: 'email', passReqToCallback: true },
        function (req, email, password, done) {
            const userType = req.body.userType
            let findIn = userType === "medic" ? Medico : userType === "pacient" ? Patient : Administrator;
            findIn.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (user) {
                    const serializeData = { id: user.id, type: userType, role: user.role }
                    console.log(serializeData);
                    done(null, serializeData)
                } else {
                    done("El usuario no existe")
                }
            })

        }
    )
}


module.exports = {
    useLocalStrategy
}