const express = require('express')
const router = express.Router()
const userService = require('../BL/user.service')
const upload = require('../middlewares/uploads')
const { tokenToUser } = require('../middlewares/auth')
router.post('/register', upload.single('file'), async (req, res) => {
    try {
        const avatar = req.file ? `${req.file.path}` : ''
        const email = req.body.email
        const checkEmail = await userService.checkEmail(email)
        console.log(checkEmail);
        if (checkEmail === 'Email exists') {
            res.send({ success: 'Email exists' })
        }
        const result = await userService.registerUser({ body: req.body, avatar })
        res.send({ success: true })
    } catch (error) {
        console.error(error);
    }


})

router.post('/login', async (req, res) => {
    try {
        const { token, user } = await userService.loginUser(req.body)
        console.log(token);
        console.log(user);
        res.json({ token, user })
    } catch (error) {
        console.error(error);

    }
})

router.post('/refreshToken', async (req, res) => {
    try {
        const userId = req.body.userId
        const { token, user } = await userService.refreshToken(userId)
        console.log(token);
        console.log(user);
        res.json({ token, user })
    } catch (error) {
        console.error(error);

    }
})

router.get('/database-emails', async (req, res) => {
    try {
        const userId = req.user
        const result = await userService.getUsersEmails(userId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.post('/userImg', upload.single('file'), (req, res) => {
    try {

        res.send('fileName Logged in server')
    } catch (error) {
        console.log(error);
    }
})

router.get('/token-to-user', async (req, res) => {
    try {
        let user = await tokenToUser(req.headers.authorization)
        res.send(user)
    } catch (error) {
        console.log(error);
    }
})
module.exports = router