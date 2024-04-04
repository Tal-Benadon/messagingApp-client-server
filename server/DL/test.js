const userController = require('./controllers/user.controller')
const userModel = require('./models/user.model')
const chatController = require('./controllers/chat.controller')
const chatModel = require('./models/chat.model')



async function go() {
    require('dotenv').config()
    require('./db').connect()
    await userModel.collection.drop()
    await chatModel.collection.drop()

    console.log("###########  START  #########");

    const users = [
        {
            email: "user1@example.com",
            fullName: "Moshe Cohen",
            password: "123qwe",
            avatar: "http://",
            chats: [],
        },
        {
            email: "user2@example.com",
            fullName: "Haim Levi",
            password: "123456",
            avatar: "http://",
            chats: [],
        },
        {
            email: "user3@example.com",
            fullName: "Mor Noam",
            password: "123qwe",
            avatar: "http://",
            chats: [],
        },
    ]

    let ru1 = await userController.create(users[0])
    let ru2 = await userController.create(users[1])
    let ru3 = await userController.create(users[2])

    const chats = [{
        subject: "Hello, how are you?",
        to: [ru1._id, ru2._id],
        msg: [{
            from: ru2._id,
            date: "2024-03-21T10:00:00.000Z",
            content: "Greeting and you??",

        }, {
            from: ru1._id,
            date: "2024-03-21T10:08:00.000Z",
            content: "Fine, and you?",
        }, {
            from: ru2._id,
            date: "2024-03-21T10:24:00.000Z",
            content: "Walla Sababa !!",
        },],
        lastDate: "2024-03-21T10:24:00.000Z"
    }, {
        subject: "Report Request",
        to: [ru2._id, ru3._id],
        msg: [{
            from: ru3._id,
            date: "2024-03-20T09:30:00.000Z",
            content: "Could you please send me the report?",
        },
        {
            from: ru2._id,
            date: "2024-03-20T10:45:00.000Z",
            content: "whyyyyy?!?!",
        }, {

            from: ru3._id,
            date: "2024-03-20T10:57:00.000Z",
            content: "why whyyyyyyy?!?!",
        }, {
            from: ru2._id,
            date: "2024-03-21T07:30:00.000Z",
            content: "Ok, i'm fired!",
        },],
        lastDate: "2024-03-21T07:30:00.000Z"
    }]

    const chatDB = []
    for (e of chats) {
        let ee = await chatController.create(e)
        chatDB.push(ee)
    }


    ru1.chats.push({
        chat: chatDB[0]._id,
        isSent: true,
        isRecieved: true,
        isFavorite: false,
        isDeleted: false,
    })

    ru1.save()

    ru2.chats.push({
        chat: chatDB[0]._id,
        isSent: true,
        isRecieved: true,
        isFavorite: false,
        isDeleted: false,
    },
        {
            chat: chatDB[1]._id,
            isSent: true,
            isRecieved: true,
            isFavorite: false,
            isDeleted: false,
        })
    ru2.save()

    ru3.chats.push({
        chat: chatDB[1]._id,
        isSent: true,
        isRecieved: true,
        isFavorite: false,
        isDeleted: false,
    })
    ru3.save()

    console.log("###########  END  ##########");

}

go()