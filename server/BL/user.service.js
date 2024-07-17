const userController = require('../DL/controllers/user.controller')
const bcrypt = require('bcrypt')
const cloudinary = require('../cloudinary')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const saltRound = 8
const secret = process.env.SECRET

async function getUser(filter = {}, select = '') {
    const user = await userController.read(filter, false, select)

    return user[0]
}

const createToken = (payload) => jwt.sign(payload, secret, { expiresIn: '1w' })
const decodeToken = (token) => jwt.verify(token, secret)

async function registerUser({ body, avatar = '' }) {
    try {
        const hash = bcrypt.hashSync(body.password, saltRound)
        const user = { fullName: body.fullName, email: body.email, password: hash, avatar }
        const newUser = await userController.create(user)
        return newUser
    } catch (error) {
        console.error(error);
    }
}

async function editAvatar(userId, file) {
    try {

        //*** Pull user from database for old image deletion and new image insertion ***//
        const user = await getUser({ _id: userId }, '-password -chats')
        const avatarUrl = user.avatar

        //*** Separation of avatar url for Cloudinary public_id identification ***//
        //*** The url is usually composed of 9 parts when split by a "/", if this is not anymore the case, function need to be updated  ***/
        const parts = avatarUrl.split('/')

        if (parts.length !== 9 && parts.length !== 1) {
            throw new Error('Url does not have the expeted format')
        }
        const folderName = parts[7]
        const IdandFormat = parts[8]
        const folderAndId = [folderName, IdandFormat]
        const oldPublic_id = folderAndId.join('/').split('.')[0]
        console.log({ oldPublic_id });

        //*** Uploading the new image to Cloudinary using upload stream with buffer ***/
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'profile-pictures' },
                (error, result) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(result)
                }
            )
            uploadStream.end(file.buffer)
        })
        const newPublicId = result.public_id

        /*** If the cloudinary upload is successful, update the new image and delete the previous from Cloudinary ***/
        if (result && newPublicId) {

            if (parts.length !== 1) {
                const deleteResult = await new Promise((resolve, reject) => {
                    cloudinary.uploader.destroy(
                        oldPublic_id, { resource_type: 'image' }, (error, result) => {
                            if (error) {
                                return reject(error)
                            }
                            resolve(result)
                        }
                    )
                })
                user.avatar = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v${result.version}/${newPublicId}.${result.format}`
                userController.save(user)


                if (deleteResult.result === 'not found') {
                    throw new Error('Previous image not found, deletion aborted')
                }
                if (deleteResult.result === 'ok') {
                    console.log("proccess complete");
                    return { success: true, user, msg: "Image update complete" }
                }
            }
            user.avatar = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v${result.version}/${newPublicId}.${result.format}`
            userController.save(user)
            return { success: true, user, msg: "Image update complete" }
        }


    } catch (error) {
        if (error === 'Previous image not found, deletion aborted') {
            return { success: false, msg: "Previous image not deleted", user }
        } else {
            console.error(error);
        }
    }
}

async function checkEmail(email) {
    try {
        const result = await userController.read({ email: email })
        if (result.length > 0) {
            return "Email exists"
        } else {
            return "Email doesnt exists"
        }
    } catch (error) {
        console.error(error);

    }
}

async function loginUser(body) {
    try {
        const userFromDb = await userController.readOne({ email: body.email })
        console.log(userFromDb);
        if (!userFromDb) throw ({ msg: "user doesn't exists", code: 404 })

        const isRight = bcrypt.compareSync(body.password, userFromDb.password)
        if (!isRight) throw ({ msg: "Not authorized", code: 401 })
        const user = await userController.readOne({ _id: userFromDb._id }, '-password -chats')
        const token = createToken({ _id: userFromDb._id })
        return {
            token, user
        }
    } catch (error) {
        console.error(error);
        // res.status(error.code || 500).json({ msg: error.msg || "something went wrong" })
    }
}

async function refreshToken(userId) {
    try {
        const userFromDb = await userController.readOne({ _id: userId }, '-password -chats')
        console.log(userFromDb);
        if (!userFromDb) throw ({ msg: "user not found", code: 404 })
        const newToken = createToken({ id: userFromDb._id })
        return {
            token: newToken, user: userFromDb
        }
    } catch (error) {
        console.error(error);
    }
}
async function getUsersEmails(userId, filter = {}) {
    try {
        const usersEmails = await userController.read(filter, false, 'email')
        const filteredEmails = usersEmails.filter(email => !email._id.equals(userId))
        return filteredEmails
    } catch (error) {
        console.error(error);
    }
}

module.exports = { getUser, getUsersEmails, registerUser, checkEmail, loginUser, refreshToken, editAvatar }