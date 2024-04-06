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
        const recipients = body.members
        const data = {
            subject: body.subject,
            members: [userId, ...body.members],
            lastDate: body.date,
            msg: [body.msg]
        }

        const newChat = await createChat(userId, data)

        const result = await updateAfterSendStatus(userId, newChat._id, recipients)

        return {
            newChat: newChat,
            updateResult: result
        }
    } catch (error) {
        console.error(error);
    }
}

async function createChat(userId, data) {
    try {
        const newChat = await chatController.create({ ...data })
        const updateUser = await userController.updateOne(
            { _id: userId },
            { $push: { chats: { chat: newChat._id } } },

        )
        return newChat
    } catch (error) {
        console.error(error);
    }
}

async function updateAfterSendStatus(userId, chatId, recipients) {
    try {
        const updateSentStatus = await userController.updateOne(
            { _id: userId, "chats.chat": chatId },
            { $set: { "chats.$.isSent": true } }
        )

        const updateAddedMembers = await userController.updateMany(
            { _id: { $in: recipients } },
            {
                $push: { chats: { chat: chatId, isReceived: true } },
            },
        )
        console.log(updateSentStatus);
        console.log(updateAddedMembers);
        return {
            user: {
                isUpdated: updateSentStatus.chats[chats.length - 1].isSent
            },
            members: {
                receivedInDataBase: updateAddedMembers.acknowledged,
                fieldsFound: updateAddedMembers.matchedCount,
                fieldsChanged: updateAddedMembers.modifiedCount,
            }
        }
    } catch (error) {
        console.error(error);
    }
}

async function createDraft(userId, data) {
    try {
        const newDraft = await createChat(userId, data)

        const updateDraftTrue = await moveToDraft(newDraft._id, userId)

        return {
            draft: newDraft,
            update: updateDraftTrue
        }

    } catch (error) {
        console.error(error);
    }
}

async function sendDraft(userId, chatId) {
    try {

        const userUpdate = await userController.updateOne(
            { _id: userId, 'chats.chat': chatId },
            {
                $set: {
                    'chats.$.draft': false,
                    'chats.$.isSent': true
                }
            }
        )
        const chat = await chatController.readOne({ _id: chatId }, { msgs: true })
        const membersToUpdate = chat.members.filter(member => !member._id.equals(userId._id))


        const updateAddedMembers = await userController.updateMany(
            { _id: { $in: membersToUpdate } },
            {
                $push: { chats: { chat: chatId, isReceived: true } },
            },
        )

        return {
            success: true,
            chat
        }
    } catch (error) {
        console.error(error);
    }
}

async function getReceivedChats(userId) {
    try {
        const user = await userController.readOne({ _id: userId }, { chats: true, users: true })
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
        const user = await userController.readOne({ _id: userId }, { chats: true, users: true })
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
        const user = await userController.readOne({ _id: userId }, { chats: true, users: true })
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
        const user = await userController.readOne({ _id: userId }, { chats: true, users: true })
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
        const user = await userController.readOne({ _id: userId }, { chats: true, users: true })
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

async function deleteChat(userId, chatId) {
    try {
        const result = await userController.updateOne(
            { _id: userId, 'chats.chat': chatId },
            {
                $set: {
                    "chats.$.isDeleted": true,
                    "chats.$.isFavorite": false,
                    "chats.$.isReceived": false,
                }
            }
        )
        return result
    } catch (error) {
        console.error(error);
    }
}

async function deleteDraft(userId, chatId) {
    try {
        const user = await userController.readOne({ _id: userId })
        const chatToCheck = user.chats.find(chatSection => chatSection.chat.equals(chatId))
        if (chatToCheck.draft) {
            const deleteFromUser = await userController.updateOne(
                { _id: userId },
                {
                    $pull: { chats: { chat: chatId } }
                }
            )
            const deleteFromChats = await chatController.deleteOne({ _id: chatId })
            return {
                deleted: true
            }

        } else {
            return {
                deleted: false
            }
        }
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

async function addToFavorite(userId, chatId) {
    try {
        const result = await userController.updateOne(
            { _id: userId, 'chats.chat': chatId },
            { $set: { "chats.$.isFavorite": true } }
        )
        return result
    } catch (error) {
        console.error(error);
    }
}

async function removeFromFavorite(userId, chatId) {
    try {
        const result = await userController.updateOne(
            { _id: userId, 'chats.chat': chatId },
            { $set: { "chats.$.isFavorite": false } }
        )
        return result
    } catch (error) {
        console.error(error);
    }
}

async function readChat(userId, chatId) {
    try {
        const result = await userController.updateOne(
            { _id: userId, 'chats.chat': chatId },
            { $set: { "chats.$.isRead": true } }
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
    moveToDraft,
    createChat,
    updateAfterSendStatus,
    sendDraft,
    createDraft,
    addToFavorite,
    removeFromFavorite,
    readChat,
    deleteChat,
    deleteDraft
}