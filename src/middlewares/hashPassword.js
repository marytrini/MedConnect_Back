const bcrypt = require('bcrypt')
function hashPassword(Model) {
    return Model.beforeCreate(function (user) {
        return bcrypt.hash(user.password, 10)
          .then(hash => {
            user.password = hash
          })
          .catch(err => {
            throw new Error(err)
          })
      })
}
module.exports = {
    hashPassword
}