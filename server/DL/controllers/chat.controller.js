const chatModel = require('../models/chat.model')


async function create(data) {
    return await chatModel.create(data)
}

async function read(filter = {}) {
    return await chatModel.find(filter)
}

async function readOne(filter, populate) {
    return await chatModel.findOne(filter).populate(populate)
}

async function updateOne(filter, data) {
    return await chatModel.findOneAndUpdate(filter, data)
}
module.exports = { create, read, readOne, updateOne }