const multer = require('multer')
const fs = require('fs')
const path = require('path')


// const uploadDirectory = path.join(__dirname, 'uploads', 'profile-pictures')



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDirectory)
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })
const storage = multer.memoryStorage()

const upload = multer({ storage })

module.exports = upload