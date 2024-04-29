const multer = require('multer')
const fs = require('fs')
const path = require('path')


const uploadDirectory = path.join(__dirname, 'uploads', 'profile-pictures')

// fs.mkdir(uploadDirectory, { recursive: true }, (error) => {
//     if (error) throw error
//     console.log(`Upload directory is ready at ${uploadDirectory}`);
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

module.exports = upload