const userController = require('../DL/controllers/user.controller')
const chatController = require('../DL/controllers/chat.controller')

function namesInTitleFormat(membersList, userId) {

    const noUserMemberList = membersList.filter(member => !member._id.equals(userId._id))

    const extraMembers = noUserMemberList.length - 2

    if (noUserMemberList.length > 2) {
        const namesTitle = `${noUserMemberList[0].fullName}, ${noUserMemberList[1]?.fullName} +${extraMembers}`
        return namesTitle
    }
    if (noUserMemberList.length === 2) {
        const namesTitle = `${noUserMemberList[0].fullName}, ${noUserMemberList[1]?.fullName}`
        return namesTitle
    } else {
        const namesTitle = noUserMemberList[0].fullName
        return namesTitle
    }
}

async function createSendChat(body, userId) {
    try {
        const membersWithoutUser = body.members
        const data = {
            subject: body.subject,
            members: [userId, ...body.members],
            lastDate: body.date,
            msg: [body.msg]
        }
        const user = await userController.readOne({ _id: userId })
        // console.log(user);

        const newChat = await chatController.create({ ...data })
        const updateUser = await userController.updateOne(
            { _id: userId },
            { $push: { chats: { chat: newChat._id } } },

        )
        const updateSentStatus = await userController.updateOne(
            { _id: userId, "chats.chat": newChat._id },
            { $set: { "chats.$.isSent": true } }
        )

        const updateAddedMembers = await userController.updateMany(
            { _id: { $in: membersWithoutUser } },
            {
                $push: { chats: { chat: newChat._id, isReceived: true } },
            },
        )

        console.log(newChat);
        return newChat
    } catch (error) {
        console.error(error);
    }
}


async function getReceivedChats(userId) {
    try {
        const user = await userController.readOne({ _id: userId })
        let chatsList = user.chats.filter(chat => chat.isReceived)
        console.log(chatsList);
        chatsList = chatsList.map(chats => {
            return {
                chatInitial: chats.chat.subject.charAt(0),
                subjectPreview: chats.chat.subject,
                namesTitle: namesInTitleFormat(chats.chat.members, userId)
            }
        })
        return chatsList

    } catch (error) {
        console.error(error);
    }
}

async function getSentChats(userId) {
    try {
        const user = await userController.readOne({ _id: userId })
        let chatsList = user.chats.filter(chat => chat.isSent)
        console.log(chatsList);
        chatsList = chatsList.map(chats => {
            return {
                chatInitial: chats.chat.subject.charAt(0),
                subjectPreview: chats.chat.subject,
                namesTitle: namesInTitleFormat(chats.chat.members, userId)
            }
        })
        return chatsList
    } catch (error) {
        console.error(error);
    }
}

async function getfavoriteChats(userId) {
    try {
        const user = await userController.readOne({ _id: userId })
        let chatsList = user.chats.filter(chat => chat.isFavorite)
        console.log(chatsList);
        chatsList = chatsList.map(chats => {
            return {
                chatInitial: chats.chat.subject.charAt(0),
                subjectPreview: chats.chat.subject,
                namesTitle: namesInTitleFormat(chats.chat.members, userId)
            }
        })
        return chatsList
    } catch (error) {
        console.error(error);
    }
}

async function getDraftChats(userId) {
    try {
        const user = await userController.readOne({ _id: userId })
        let chatsList = user.chats.filter(chat => chat.draft)
        console.log(chatsList);
        chatsList = chatsList.map(chats => {
            return {
                chatInitial: chats.chat.subject.charAt(0),
                subjectPreview: chats.chat.subject,
                namesTitle: namesInTitleFormat(chats.chat.members, userId)
            }
        })
        return chatsList
    } catch (error) {
        console.error(error);
    }
}

async function getdeletedChats(userId) {
    try {
        const user = await userController.readOne({ _id: userId })
        let chatsList = user.chats.filter(chat => chat.isDeleted)
        console.log(chatsList);
        chatsList = chatsList.map(chats => {
            return {
                chatInitial: chats.chat.subject.charAt(0),
                subjectPreview: chats.chat.subject,
                namesTitle: namesInTitleFormat(chats.chat.members, userId)
            }
        })
        return chatsList
    } catch (error) {
        console.error(error);
    }
}

async function moveToDraft(chatId, userId) {
    try {
        const result = await userController.updateOne(
            { _id: userId, 'chats.chat': chatId },
            { $set: { "chats.$.draft": true } }
        )
        return result
    } catch (error) {
        console.error(error);
    }
}

async function getChatMessages(chatId) {
    try {
        const chat = await chatController.readOne({ _id: chatId })
        let msgList = chat.msg
        msgList = msgList.map(msg => {
            return {
                date: msg.date,
                content: msg.content,
                sender: msg.from.fullName,
                senderId: msg.from._id,
                avatar: msg.from.avatar
            }
        })
        return msgList
        // const messageList = chat.msg
        // console.log();
        // return messageList
    } catch (error) {
        console.error(error);

    }
}


module.exports = {
    getReceivedChats,
    getSentChats,
    getChatMessages,
    getfavoriteChats,
    getdeletedChats,
    createSendChat,
    getDraftChats,
    moveToDraft
}