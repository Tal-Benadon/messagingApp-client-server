const express = require('express')
const router = express.Router()
const userService = require('../BL/user.service')
router.post('/register', async (req, res) => {
    try {
        console.log("hi");
    } catch (error) {

    }


})

router.get('/database-emails', async (req, res) => {
    try {
        const userId = req.user._id
        const result = await userService.getUsersEmails(userId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})
module.exports = router