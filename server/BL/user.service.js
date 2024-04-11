const userController = require('../DL/controllers/user.controller')

async function getUser(filter = {}) {
    const user = await userController.read(filter)
    console.log(user);
    return user
}

async function getUsersEmails(userId, filter = {}) {
    try {
        const usersEmails = await userController.read(filter, false, 'email')
        const filteredEmails = usersEmails.filter(email => !email._id.equals(userId))
        return filteredEmails
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getUser, getUsersEmails }