const userController = require('../DL/controllers/user.controller')

async function getUser(filter = {}) {
    const user = await userController.read(filter)
    console.log(user);
    return user
}



module.exports = { getUser }