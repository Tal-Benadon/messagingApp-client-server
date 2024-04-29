const mongoose = require('mongoose')
require('./chat.model')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,

    },
    isActive: {
        type: Boolean,
        default: true,
    },
    chats: [{
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chat"
        },
        isRead: {
            type: Boolean,
            default: false
        },
        isReceived: {
            type: Boolean,
            default: false
        },
        isSent: {
            type: Boolean,
            default: false
        },
        isFavorite: {
            type: Boolean,
            default: false
        },
        draft: {
            type: Boolean,
            default: false
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        labels: [String]
        //tags?
    }
    ]


})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel

