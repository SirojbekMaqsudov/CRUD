const multer = require("multer")
const uuid = require("uuid")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname)
    },

    filename: (req, file, cb) => {
        const rand = uuid.v4() + '.png'
        cb(null, rand)
    }
})

module.exports = multer({storage})