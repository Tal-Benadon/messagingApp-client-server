const chatModel = require('../models/chat.model')


async function create(data) {
    return await chatModel.create(data)
}

async function read(filter = {}) {
    return await chatModel.find(filter)
}

async function readOne(filter, populate) {
    // let population = {
    //     msgs: true,
    //     users: true
    // }
    let data = await chatModel.findOne(filter)
    if (populate.msgs) data = await chatModel.findOne(filter).populate('msg.from')
    return data
}

async function updateOne(filter, data) {
    return await chatModel.findOneAndUpdate(filter, data)
}

async function deleteOne(filter) {
    return await chatModel.deleteOne(filter)
}
module.exports = { create, read, readOne, updateOne, deleteOne }