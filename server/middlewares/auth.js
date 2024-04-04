

async function auth(req, res, next) {
    try {
        req.user = { _id: "660e9b7ffd6968d3bfa0ce16" }
        next()
    } catch (error) {
        res.sendStatus(401)
    }
}

module.exports = { auth }