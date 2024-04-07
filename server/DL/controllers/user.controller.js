const userModel = require('../models/user.model')


async function create(data) {
    return await userModel.create(data)
}

async function read(filter = {}, populate) {
    return await userModel.find(filter).populate(populate)
}

async function readOne(filter) {
    let data = await userModel.findOne({ ...filter, isActive: true })
    return data

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

async function readByFlags(id, flags = [], populate = {}) {
    console.log("flags", flags);
    let data = await userModel.findOne({ _id: id, isActive: true })
    data.chats = data.chats.filter(chat => flags.every(flag => {
        if (typeof flag === 'object') {
            let [[key, value]] = Object.entries(flag)
            return chat[key] == value
        }
        return chat[flag]
    }))
    if (populate.chats) data = await data.populate('chats.chat')
    if (populate.users) data = await data.populate({ path: 'chats.chat.members', select: "fullName avatar _id" })

    return data.toObject()
}

async function save(data) {
    return await data.save()
}
module.exports = { create, read, readOne, readOneById, updateOne, updateMany, readByFlags, save }