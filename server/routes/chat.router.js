const express = require('express')
const router = express.Router()
const chatService = require('../BL/chat.service')
const { auth } = require('../middlewares/auth')


router.get('/inbox/:flag/:page', async (req, res) => {
    try {
        let flag = req.params.flag
        const userId = req.user
        console.log(userId);
        let page = req.params.page
        if (!req.params.page) {
            page = 1
        }
        let result = await chatService.getChats({ userId, flag, page })
        res.send(result)
        // console.log(flag, result);
    } catch (error) {
        console.error(error);
    }
})
router.put('/:chatId/read', async (req, res) => {
    try {
        const userId = req.user
        const chatId = req.params.chatId
        const result = await chatService.readChat(userId, chatId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})
router.post('/create-send', async (req, res) => {
    try {
        const userId = req.user

        const data = req.body
        // console.log(data);

        const result = await chatService.createSendChat(data, userId)
        console.log("IM THE RESULT", result);
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.post('/create-draft', async (req, res) => {
    try {
        const userId = req.user

        const data = req.body

        const result = await chatService.createDraft(userId, data)

        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.put('/update-draft', async (req, res) => {
    try {
        const userId = req.user
        const draftId = req.body.draftId
        const data = req.body
        console.log(draftId);
        const result = await chatService.updateDraft(userId, draftId, data)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.put('/:chatId/send-draft', async (req, res) => {
    try {
        const userId = req.user


        chatId = req.params.chatId //from params? from body?
        const result = await chatService.sendDraft(userId, chatId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})


router.put('/:chatId/favorite', async (req, res) => {
    try {
        const userId = req.user
        const chatId = req.params.chatId
        const result = await chatService.addToFavorite(userId, chatId)
        res.send(result)
    } catch (error) {
        res.send({ success: false }).status(401)
    }
})
router.put('/:chatId/remove-favorite', async (req, res) => {
    try {
        const userId = req.user
        const chatId = req.params.chatId
        const result = await chatService.removeFromFavorite(userId, chatId)
        res.send(result)
    } catch (error) {
        res.send({ success: false }).status(401)
    }
})

router.delete('/:chatId/move-chat', async (req, res) => {
    try {
        const userId = req.user
        const chatId = req.params.chatId
        const result = await chatService.deleteChat(userId, chatId)
        // console.log("hi");
        // const result = "hi"
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.delete('/:chatId/delete-chat', async (req, res) => {
    try {
        // const userId = req.user
        // const chatId = req.params.chatId
        // const result = await chatService.removeChatFromUser(userId, chatId)
        const result = "hi"
        console.log('hi');
        res.send(result)
    } catch (error) {
        console.error(error);

    }
})

router.put('/:chatId/restore-chat', async (req, res) => {
    try {
        const userId = req.user
        const chatId = req.params.chatId
        const result = await chatService.restoreChat(userId, chatId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.delete('/:chatId/delete-draft', async (req, res) => {
    try {
        const userId = req.user
        // const chatId = '661199004496ff7edd968a21' // params?
        const chatId = req.params.chatId

        const result = await chatService.deleteDraft(userId, chatId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.put('/:chatId/read', async (req, res) => {
    try {
        const userId = req.user
        const chatId = '66115f43f4fafb5258259639' // params?
        const result = await chatService.readChat(userId, chatId)

        res.send(result)
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
        // chatId = "660ef14b903f9d79c95a544f"
        const chatId = req.params.chatId
        const chat = await chatService.getChatMessages(chatId)
        res.send(chat)
    } catch (error) {
        console.error(error);
    }
})

router.put('/:chatId/messages', async (req, res) => {
    try {
        // const userId = req.user
        const chatId = req.params.chatId
        const msgData = req.body
        msgData.from = req.user
        console.log(msgData);
        const result = await chatService.sendMessage(chatId, msgData)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})


router.get('/subject/:chatId', async (req, res) => {
    try {
        const chatId = req.params.chatId
        const result = await chatService.getSubject(chatId)
        console.log(result);
        const toClient = {
            subject: result
        }

        res.send(toClient)
    } catch (error) {
        console.error(error);
    }
})
module.exports = router