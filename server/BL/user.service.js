const userController = require('../DL/controllers/user.controller')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const saltRound = 8
const secret = process.env.SECRET
async function getUser(filter = {}) {
    const user = await userController.read(filter)
    console.log(user);
    return user
}

const createToken = (payload) => jwt.sign(payload, secret, { expiresIn: '1d' })
const decodeToken = (token) => jwt.verify(token, secret)

async function registerUser({ body, avatar = '' }) {
    try {
        const hash = bcrypt.hashSync(body.password, saltRound)
        const user = { fullName: body.fullName, email: body.email, password: hash, avatar }
        const newUser = await userController.create(user)
        console.log(newUser);
    } catch (error) {
        console.error(error);
    }
}

async function checkEmail(email) {
    try {
        const result = await userController.read({ email: email })
        if (result.length > 0) {
            return "Email exists"
        } else {
            return "Email doesnt exists"
        }
    } catch (error) {
        console.error(error);

    }
}

async function loginUser(body) {
    try {
        const userFromDb = await userController.readOne({ email: body.email })
        console.log(userFromDb);
        if (!userFromDb) throw ({ msg: "user doesn't exists", code: 404 })

        const isRight = bcrypt.compareSync(body.password, userFromDb.password)
        if (!isRight) throw ({ msg: "Not authorized", code: 401 })
        const user = await userController.readOne({ _id: userFromDb._id }, '-password -chats')
        const token = createToken({ _id: userFromDb._id })
        return {
            token, user
        }
    } catch (error) {
        console.error(error);
        // res.status(error.code || 500).json({ msg: error.msg || "something went wrong" })
    }
}

async function refreshToken(userId) {
    try {
        const userFromDb = await userController.readOne({ _id: userId }, '-password -chats')
        console.log(userFromDb);
        if (!userFromDb) throw ({ msg: "user not found", code: 404 })
        const newToken = createToken({ id: userFromDb._id })
        return {
            token: newToken, user: userFromDb
        }
    } catch (error) {
        console.error(error);
    }
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

module.exports = { getUser, getUsersEmails, registerUser, checkEmail, loginUser, refreshToken }