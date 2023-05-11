async function getUserData(Model, id) {
    const userData = await Model.findOne({
        where: {
            id: id
        }
    })
    return userData
}

module.exports = {
    getUserData
}