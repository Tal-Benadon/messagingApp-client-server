const userModel = require('../models/user.model')


async function create(data) {
    return await userModel.create(data)
}

async function read(filter = {}, populate = false, select = '') {
    let query = userModel.find(filter)
    if (populate)
        query = query.populate(populate)
    if (select)
        query = query.select(select)
    const data = await query
    return data
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

async function readByFlags(id, flags = [], populate = {}, searchBy, page) {
    console.log("flags", flags);
    let data = await userModel.findOne({ _id: id, isActive: true })
    if (!data?.chats) return {}
    data.chats = data.chats.filter(chat => flags.every(flag => {
        if (typeof flag === 'object') {
            let [[key, value]] = Object.entries(flag)
            return chat[key] == value
        }
        return chat[flag]
    }))
    if (populate.chats) data = await data.populate('chats.chat')
    if (populate.users) data = await data.populate({ path: 'chats.chat.members', select: "fullName avatar _id" })

    if (searchBy) {
        searchBy = searchBy.toLowerCase()
        data.chats = data.chats.filter(chat => {
            chat.chat.subject.toLowerCase().includes(searchBy) ||
                chat.chat.emmbers.find(mem => mem.fullName.toLowerCase().includes(searchBy))
        })
    }
    if (!data) return {}

    const pages = Math.ceil(data?.chats?.length / 10)
    if (pages > 1) {
        const from = (page - 1) * 10
        const to = from + 10
        data.chats = data.chats.slice(from, to)
    }
    return { chats: data.chats, pages }
}

async function save(data) {
    return await data.save()
}
module.exports = { create, read, readOne, readOneById, updateOne, updateMany, readByFlags, save }