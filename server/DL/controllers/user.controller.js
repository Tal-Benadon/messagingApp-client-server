const userModel = require('../models/user.model')


async function create(data) {
    return await userModel.create(data)
}

async function read(filter = {}, populate) {
    return await userModel.find(filter).populate(populate)
}

async function readOne(filter, populate = '') {
    // let population = {
    //     chats: true,
    //     users: true,
    // }
    let data = await userModel.findOne({ ...filter, isActive: true })
    if (populate.chats) data = await data.populate('chats.chat')
    if (populate.users) data = await data.populate('chats.chat.members')
    return data.toObject()
}

async function readOneById(filter) {
    return await userModel.findById(filter)
}

async function updateOne(filter, data) {
    return await userModel.findOneAndUpdate(filter, data, { new: true })
}

async function updateMany(filter, data) {
    return await userModel.updateMany(filter, data, { new: true })
}
module.exports = { create, read, readOne, readOneById, updateOne, updateMany }