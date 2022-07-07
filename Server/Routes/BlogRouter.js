const {Router} = require("express")
const router = Router()
const Controller = require("../Controllers/BlogController")
const Upload = require("../Uploads/Multer")

// router.get('/', Controller.Find)
// router.post("/create", Upload.single('image'), Controller.Create)

module.exports = router