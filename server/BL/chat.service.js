const userController = require('../DL/controllers/user.controller')
const chatController = require('../DL/controllers/chat.controller')
const { Flags } = require('../utility')
let funcs = {
    inbox: [Flags.Inbox, Flags.NotDeleted],
    notread: [Flags.NotRead],
    sent: [Flags.Sent, Flags.NotDeleted],
    favourite: [Flags.Favorite, Flags.NotDeleted],
    deleted: [Flags.Deleted],
    draft: [Flags.Draft, Flags.NotDeleted],
}


//================================================ Template
async function getChats({ userId, flag, page = 1 }) {
    if (!funcs[flag]) throw "you've been thrown"
    let { chats, pages } = await userController.readByFlags({ id: userId, flags: funcs[flag], page, populate: { chats: true, users: true } })
    // console.log(chats);
    return { chats, pages }
}
//================================================


async function createSendChat(body, userId) {
    try {
        const recipients = body.members
        console.log(recipients);
        body.members = [...body.members, userId]

        const newChat = await createChat(userId, body)

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
            { $push: { chats: { chat: newChat._id, isRead: true } } },

        )
        return newChat
    } catch (error) {
        console.error(error);
    }
}

async function updateAfterSendStatus(userId, chatId, recipients) {
    try {
        // send to Aviad's server
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
            success: true
        }
    } catch (error) {
        console.error(error);
    }
}

async function createDraft(userId, data) {
    try {
        data.members = [...data.members, userId]
        const newDraft = await createChat(userId, data)
        // console.log("newDraft", newDraft);
        console.log('Im New Draft ID', newDraft._id);
        console.log('Im USER IDDD', userId);
        const updateDraftTrue = await moveToDraft(newDraft._id, userId)

        return {
            draft: newDraft,
            update: updateDraftTrue
        }

    } catch (error) {
        console.error(error);
    }
}

async function updateDraft(userId, draftId, data) {
    try {
        console.log("data", data);
        console.log("draftId", draftId);
        const chat = await chatController.readOne({ _id: draftId })
        console.log(chat);
        if (!data.subject && data.members.length === 0 && !chat.msg.content) {
            deleteDraft(userId, chat._id)
            return 'Draft Deleted'
        }
        chat.subject = data.subject
        chat.members = data.members
        chat.msg = [data.msg]
        chatController.save(chat)
        return { success: true }
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










async function deleteChat(userId, chatId) {
    try {
        const result = await userController.updateOne(
            { _id: userId, 'chats.chat': chatId },
            {
                $set: {
                    "chats.$.isDeleted": true,
                }
            }
        )
        console.log("result", result);
        // console.log(result.chats[]);
        return result
    } catch (error) {
        console.error(error);
    }
}

async function restoreChat(userId, chatId) {
    try {
        const result = await userController.updateOne(
            { _id: userId, 'chats.chat': chatId },
            {
                $set: {
                    "chats.$.isDeleted": false,
                }
            }
        )
        console.log("result", result);
        return result
    } catch (error) {
        console.error(error);
    }
}
async function removeChatFromUser(userId, chatId) {
    try {
        const user = await userController.readOne({ _id: userId })
        const chatToCheck = user.chats.find(chatSection => chatSection.chat.equals(chatId._id))
        if (chatToCheck.isDeleted) {
            const deleteFromUser = await userController.updateOne(
                { _id: userId },
                {
                    $pull: { chats: { chat: chatId } }
                }
            )
        }
        console.log(chatToCheck);
        return chatToCheck
    } catch (error) {
        console.error(error);
    }
}

async function deleteDraft(userId, chatId) {
    try {
        console.log("UserId", userId);
        console.log("ChatId", chatId);
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
        let user = await userController.readOne({ _id: userId })
        console.log(user);
        user.chats.find(chat => chat.chat.toString() === chatId.toString()).draft = true
        userController.save(user)
        return {
            success: true
        }
    } catch (error) {
        console.error(error);
    }
}

async function addToFavorite(userId, chatId) {
    try {
        let user = await userController.readOne(userId)
        user.chats.find(chat => chat.chat.toString() === chatId).isFavorite = true
        userController.save(user)
        return {
            success: true
        }
    } catch (error) {
        console.error(error);
    }
}

async function removeFromFavorite(userId, chatId) {
    try {
        let user = await userController.readOne(userId)
        user.chats.find(chat => chat.chat.toString() === chatId).isFavorite = false
        userController.save(user)
        return {
            success: true
        }
    } catch (error) {
        console.error(error);
    }
}

async function readChat(userId, chatId) {
    try {
        console.log(chatId);
        let user = await userController.readOne(userId)
        user.chats.find(chat => chat.chat.toString() === chatId).isRead = true
        userController.save(user)
        return {
            success: true
        }
    } catch (error) {
        console.error(error);
    }
}


async function getChatMessages(chatId) {
    try {
        const chat = await chatController.readOne({ _id: chatId }, { msgs: true })
        // let msgList = chat.msg
        // msgList = msgList.map(msg => {
        //     return {
        //         date: msg.date,
        //         content: msg.content,
        //         sender: msg.from.fullName,
        //         senderId: msg.from._id,
        //         avatar: msg.from.avatar
        //     }
        // })
        // return msgList
        return chat
    } catch (error) {
        console.error(error);

    }
}

async function sendMessage(chatId, msgData) {
    try {

        const chat = await chatController.readOne({ _id: chatId })
        if (chat) {
            chat.msg.push(msgData)
            chatController.save(chat)
            return {
                success: true
            }
        } else {
            return {
                success: false
            }
        }
    } catch (error) {
        console.error(error);

    }
}

async function getSubject(chatId) {
    try {
        const chat = await chatController.readOne({ _id: chatId })
        const subject = chat.subject
        console.log(subject);
        return subject
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    getChatMessages,
    createSendChat,
    moveToDraft,
    createChat,
    updateAfterSendStatus,
    sendDraft,
    createDraft,
    addToFavorite,
    removeFromFavorite,
    readChat,
    deleteChat,
    deleteDraft,
    getChats,
    sendMessage,
    getSubject,
    removeChatFromUser,
    restoreChat,
    updateDraft
}