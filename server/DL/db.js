require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL

async function connect() {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('DB - connection successful');
    } catch (error) {
        console.log('mongoDB error', error);
    }
}

module.exports = { connect }