const userController = require('../DL/controllers/user.controller')
const chatController = require('../DL/controllers/chat.controller')
async function getReceivedChats(userId) {
    try {
        const user = await userController.readOne({ _id: userId }, 'chats.chat')
        const userChats = user.chats
        const receivedChats = []
        userChats.forEach(chat => {
            if (chat.isReceived === true) {
                receivedChats.push(chat)
            }
        });
        return receivedChats
    } catch (error) {
        console.error(error);
    }
}

async function getSentChats(userId) {
    try {
        const user = await userController.readOne({ _id: userId }, 'chats.chat')
        const userChats = user.chats
        const sentChats = []
        userChats.forEach(chat => {
            if (chat.isSent === true) {
                sentChats.push(chat)
            }
        });
        return sentChats
    } catch (error) {
        console.error(error);
    }
}

async function getChatMessages(chatId) {
    try {
        const chat = await chatController.readOne({ _id: chatId }, 'msg')
        const messageList = chat.msg
        return messageList
    } catch (error) {
        console.error(error);

    }
}
// getReceivedChats()

async function getInbox(userId) {
    try {

    } catch (error) {
        console.error(error);
    }
}

module.exports = { getReceivedChats, getSentChats, getChatMessages, getInbox }