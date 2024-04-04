

async function auth(req, res, next) {
    try {
        req.user = { _id: "660d34df1d6c27eac1ac3dbd" }
        next()
    } catch (error) {
        res.sendStatus(401)
    }
}

module.exports = { auth }