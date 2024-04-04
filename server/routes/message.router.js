const express = require('express')
const router = express.Router()


//get messages of a chat
router.get('/:chatId/messages', (req, res) => {
    try {
        const chatId = req.params.chatId

    } catch (error) {

    }
})


module.exports = router