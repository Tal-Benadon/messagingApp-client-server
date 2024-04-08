const express = require('express')
const router = express.Router()
const chatService = require('../BL/chat.service')


router.get('/inbox/:flag', async (req, res) => {
    try {
        let flag = req.params.flag
        const userId = req.user
        console.log(userId);
        let result = await chatService.getChats(userId, flag)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})
router.post('/create-send', async (req, res) => {
    try {
        const userId = req.user

        const data = req.body
        // const member1 = '660e9b7ffd6968d3bfa0ce14'
        // const member2 = '660e9b7ffd6968d3bfa0ce18'
        // req.body.subject = "Please help me im dead"
        // req.body.members = [member1, member2]
        // req.body.date = new Date()
        // req.body.msg = {
        //     date: new Date(),
        //     content: "What the hell just happened here?",
        //     from: userId
        // }
        const result = await chatService.createSendChat(data, userId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.post('/create-draft', async (req, res) => {
    try {
        const userId = req.user
        // const member1 = '660e9b7ffd6968d3bfa0ce14'
        // const member2 = '660e9b7ffd6968d3bfa0ce18'
        // req.body.subject = "Team oriented project, please respond ASAP"
        // req.body.members = [member1, member2]
        // req.body.date = new Date()
        // req.body.msg = {
        //     date: new Date(),
        //     content: "OYOYOYOYOYOYOYOYOYYO?",
        //     from: userId
        // }
        const data = {
            subject: req.body.subject,
            members: [userId, ...req.body.members],
            lastDate: req.body.date,
            msg: [req.body.msg],
        }

        const result = await chatService.createDraft(userId, data)

        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.put('/:chatId/send-draft', async (req, res) => {
    try {
        const userId = req.user
        const chatId = '66115f43f4fafb5258259639'


        req.params = chatId //from params? from body?
        const result = await chatService.sendDraft(userId, chatId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})


router.put('/:chatId/add-favorite', async (req, res) => {
    try {
        const userId = req.user
        const chatId = '66115f43f4fafb5258259639' // params?
        const result = await chatService.addToFavorite(userId, chatId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})
router.put('/:chatId/remove-favorite', async (req, res) => {
    try {
        const userId = req.user
        const chatId = '66115f43f4fafb5258259639' // params?
        const result = await chatService.removeFromFavorite(userId, chatId)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})

router.delete('/:chatId/delete-chat', async (req, res) => {
    try {
        const userId = req.user
        const chatId = '66115f43f4fafb5258259639' // params?
        const result = await chatService.deleteChat(userId, chatId)
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
        // req.body = {
        //     date: new Date(),
        //     content: "What the hell just happened here? im really angry that this just happened",
        //     from: userId
        // }
        const msgData = req.body
        msgData.from = req.user
        console.log(msgData);
        const result = await chatService.sendMessage(chatId, msgData)
        res.send(result)
    } catch (error) {
        console.error(error);
    }
})


//template






// router.get('/inbox/read' , async (req,res)=>{
//     try {

//     } catch (error) {

//     }
// })
// router.get('/sent' , async (req,res)=>{
//     try {

//     } catch (error) {

//     }
// })
module.exports = router