

function validateAdminCreate(role) {
    if (role === "master") {
        return true
    }
    return false
}

function validateMedicCreate(role) {
    if (role === "master" || role === "admin") {
        return true
    }
    return false
}

const notAllowed = "No tienes permisos para realizar esta accion"

module.exports = { validateAdminCreate, validateMedicCreate, notAllowed }