const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = function (sequelize) {
    const Client = sequelize.define('Client', {
        username: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaulValue: false
        },
    })

    Client.beforeSave(function (user) {
        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash
            })
            .catch(err => { throw new Error(err) })

    })
}