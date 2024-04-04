require('dotenv').config()
const express = require('express')
const cors = require('cors')
const PORT = 3000 //tobemovedToEnv
const mainRouter = require('./routes/mainRouter')


const db = require('./DL/db')
const app = express()
db.connect()


app.use(cors())
app.use(express.json())


app.use('/', mainRouter)
app.listen(PORT, () => console.log(`listening at ${PORT}`))
