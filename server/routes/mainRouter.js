const express = require('express')
const mainRouter = express.Router()
const { auth } = require('../middlewares/auth')
const chatRouter = require('./chat.router')
const userRouter = require('./user.router')
// const messageRouter = require('./message.router')
// const app = express()

mainRouter.use('/user', userRouter)
mainRouter.use('/chat', auth, chatRouter)
// mainRouter.use('/message', auth, messageRouter)
module.exports = mainRouter