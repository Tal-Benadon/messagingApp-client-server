const userModel = require('../models/user.model')


async function create(data) {
    return await userModel.create(data)
}

async function read(filter = {}, populate) {
    return await userModel.find(filter).populate(populate)
}

async function readOne(filter, populate) {
    return await userModel.findOne(filter).populate(populate)
}

async function readOneById(filter) {
    return await userModel.findById(filter)
}

async function updateOne(filter, data) {
    return await userModel.findOneAndUpdate(filter, data)
}
module.exports = { create, read, readOne, readOneById, updateOne }