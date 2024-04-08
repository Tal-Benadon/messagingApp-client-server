const userController = require('../DL/controllers/user.controller')
const chatController = require('../DL/controllers/chat.controller')
const { Flags } = require('../utility')
let funcs = {
    inbox: [Flags.Inbox],
    notread: [Flags.NotRead],
    sent: [Flags.Sent],
    favorite: [Flags.Favorite],
    deleted: [Flags.Deleted],
    draft: [Flags.Draft],
}

// user.chats = user.chats.map(chats => {
//     return {
//         chatInitial: chats.chat.subject.charAt(0),
//         subjectPreview: chats.chat.subject,
//         namesTitle: namesInTitleFormat(chats.chat.members, userId)
//     }
// })

//================================================ Template
async function getChats(userId, flag) {
    if (!funcs[flag]) throw "you've been thrown"
    let { chats } = await userController.readByFlags(userId, funcs[flag], { chats: true, users: true })
    // chats = chats.map(chat => {
    //     return {
    //         chatInitial: chat.chat.subject.charAt(0),
    //         subjectPreview: chat.chat.subject,
    //         namesTitle: namesInTitleFormat(chat.chat.members, userId)
    //     }
    // })

    return chats
}
//================================================

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

        // const newChat = await createChat(userId, data)
        // const recipients = body.members
        const data = {
            subject: body.subject,
            members: [userId, ...body.members],
            lastDate: body.date,
            msg: [body.msg]
        }

        const emails = ['user1@example.com', 'user3@example.com']
        const recipients = await Promise.all(emails.map(async email => {
            const temp = await userController.readOne({ email })
            return temp
        }))

        // const 


        const result = await updateAfterSendStatus(userId, newChat._id, recipients)

        // return {
        //     newChat: newChat,
        //     updateResult: result
        // }
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
        let user = await userController.readOne(userId)
        user.chats.find(chat => chat.chat == chatId).draft = true
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
        user.chats.find(chat => chat.chat == chatId).isFavorite = true
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
        let user = await userController.readOne(userId)
        user.chats.find(chat => chat._id == chatId).isRead = true
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
        user.chats.find(chat => chat.chat == chatId).isFavorite = false
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
    sendMessage
}