const messageModel = require('../models/message.model')


async function create(data) {
    return await messageModel.create(data)
}

async function read(filter = {}) {
    return await messageModel.find(filter)
}

async function readOne(filter, populate) {
    return await messageModel.findOne(filter).populate(populate)
}

async function updateOne(filter, data) {
    return await messageModel.findOneAndUpdate(filter, data)
}
module.exports = { create, read, readOne, updateOne }