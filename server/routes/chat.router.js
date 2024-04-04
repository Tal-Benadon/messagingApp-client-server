const express = require('express')
const router = express.Router()
const chatService = require('../BL/chat.service')


router.post('/create-send', async (req, res) => {
    try {
        const userId = req.user
        const member1 = '660e9b7ffd6968d3bfa0ce14'
        const member2 = '660e9b7ffd6968d3bfa0ce18'
        req.body.subject = "Support group for fired people"
        req.body.members = [member1, member2]
        req.body.date = new Date()
        req.body.msg = {
            date: new Date(),
            content: "I just got fired :( please help me",
            from: userId
        }
        const createdChat = await chatService.createSendChat(req.body, userId)
        res.send(createdChat)
    } catch (error) {
        console.error(error);
    }
})

router.get('/received', async (req, res) => {
    try {
        const userId = req.user
        const chatListData = await chatService.getReceivedChats(userId)
        console.log(chatListData);
        res.send(chatListData)
    } catch (error) {
        console.error(error);
    }
})

router.get('/sent', async (req, res) => {
    try {
        const userId = req.user
        const chatListData = await chatService.getSentChats(userId)
        res.send(chatListData)
    } catch (error) {
        console.error(error);
    }
})

router.get('/favorite', async (req, res) => {
    try {
        const userId = req.user
        const chatListData = await chatService.getfavoriteChats(userId)
        res.send(chatListData)
    } catch (error) {
        console.error(error);
    }
})

router.get('/deleted', async (req, res) => {
    try {
        const userId = req.user
        const chatListData = await chatService.getdeletedChats(userId)
        res.send(chatListData)
    } catch (error) {
        console.error(error);
    }
})

router.get('/drafts', async (req, res) => {
    try {
        const userId = req.user
        const draftsLists = await chatService.getDraftChats(userId)
        res.send(draftsLists)
    } catch (error) {
        console.error(error);
    }
})

router.put('/drafts', async (req, res) => {
    try {
        req.body.chatId = '660ef14b903f9d79c95a544f'
        const userId = req.user
        const result = await chatService.moveToDraft(req.body.chatId, userId)
        console.log(result);
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.get('/:chatId/messages', async (req, res) => {
    try {
        chatId = "660ef14b903f9d79c95a544f"
        const chatMessagesList = await chatService.getChatMessages(chatId)
        res.send(chatMessagesList)
    } catch (error) {
        console.error(error);
    }
})
module.exports = router