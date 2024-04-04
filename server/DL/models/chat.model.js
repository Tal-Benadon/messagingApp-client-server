const mongoose = require('mongoose')
require('./user.model')
const messageSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },


})
const chatSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    msg: [messageSchema],
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },],
    lastDate: {
        type: Date,
    }
})

const chatModel = mongoose.model('chat', chatSchema);
module.exports = chatModel