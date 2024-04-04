const express = require('express')
const router = express.Router()
const chatService = require('../BL/chat.service')

router.get('/received', async (req, res) => {
    try {

        const userId = req.user
        const receivedChats = await chatService.getReceivedChats(userId)
        res.send(receivedChats)
    } catch (error) {
        console.error(error);
    }
})
router.get('/', async (req, res) => {
    try {
        const result = chatService.getInbox(req.user._id)
    } catch (error) {
        console.error();
    }
})
router.get('/sent', async (req, res) => {
    try {
        const userId = req.user
        const sentChats = await chatService.getSentChats(userId)
        res.send(sentChats)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:chatId/messages', async (req, res) => {
    try {
        // const chatId = req.params.chatId
        chatId = "660d34e01d6c27eac1ac3dcf"
        const chatMessagesList = await chatService.getChatMessages(chatId)
        res.send(chatMessagesList)
    } catch (error) {
        console.error(error);
    }
})
module.exports = router