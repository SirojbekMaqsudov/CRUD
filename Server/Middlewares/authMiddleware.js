const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.json({error:"No Authorization"})
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY).user

        req.user = decode
        next()
    } catch (e) {
        return res.json({error: "No Authorization"})
    }
}