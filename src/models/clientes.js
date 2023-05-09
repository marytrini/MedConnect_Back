const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
    sequelize.define('Client', {
        username: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },

        password: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                msg: "El email no es valido."
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
}