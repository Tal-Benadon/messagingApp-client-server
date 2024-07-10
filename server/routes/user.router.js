const express = require('express')
const router = express.Router()
const userService = require('../BL/user.service')
const upload = require('../middlewares/uploads')
const fs = require('fs')
const { tokenToUser } = require('../middlewares/auth')
const cloudinary = require('../cloudinary')
router.post('/register', upload.single('file'), async (req, res) => {
    try {
        const file = req.file
        let avatar = ''
        if (file) {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'profile-pictures' },
                    (error, result) => {
                        if (error) {
                            return reject(error)
                        }
                        resolve(result)
                    }
                )
                uploadStream.end(file.buffer)
            })
            console.log('File uploaded successfully:', result);
            avatar = result.secure_url
        }

        const email = req.body.email
        const checkEmail = await userService.checkEmail(email)
        console.log(checkEmail);
        if (checkEmail === 'Email exists') {
            res.send({ success: 'Email exists' })
        }

        await userService.registerUser({ body: req.body, avatar })
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
        if (user === "Expired Token") {
            return res.status(401).send({ error: "Token has expired" })
        }
        console.log(user);
        res.send(user)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "An error occurred while processing your request" })

    }
})
module.exports = router