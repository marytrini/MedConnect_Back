

module.exports = async function registerDataValidator(password, email, firstName, lastName, phone, newUser) {
    let error = null;
    const mailFormat = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if (!password) return false;
    if (!email) return false;
    if (!firstName) return false;
    if (!lastName) return false;
    if (!phone) return false;

    const done = await newUser.findOne({
        where: {
            email: email
        }
    })

    if (done) {
        return 'El usuario ya existe, por favor inicia sesion.'
    } else {
        return true

    }


}