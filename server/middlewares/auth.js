const jwt = require('jsonwebtoken');
const userController = require('../DL/controllers/user.controller')
const secret = process.env.SECRET
const decodeToken = (token) => jwt.verify(token, secret)
async function auth(req, res, next) {
    try {
        const tokenBearer = req.headers.authorization
        const token = tokenBearer.replace("Bearer ", "")
        const decodedToken = decodeToken(token, secret)
        req.user = decodedToken._id
        next()
    } catch (error) {
        console.error(error);
        if (error instanceof jwt.TokenExpiredError) {
            return "Expired Token"
        } else {
            res.sendStatus(401)
        }

    }
}

async function tokenCheck(req, res, next) {
    try {
        const tokenBearer = req.headers.authorization
        const token = tokenBearer.replace("Bearer ", "")
        const payload = decodeToken(token, secret)

        req.userId = payload._id
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return "Expired Token"
        } else {
            res.sendStatus(401)
        }

    }
}

const tokenToUser = async (authorization) => {
    try {
        const tokenBearer = authorization
        const token = tokenBearer.replace("Bearer ", "")
        const payload = decodeToken(token, secret)
        const data = await userController.readOne({ _id: payload._id }, '-password -chats')
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
        if (error instanceof jwt.TokenExpiredError) {
            return "Expired Token"
        }
    }
}

module.exports = { auth, tokenToUser, tokenCheck }