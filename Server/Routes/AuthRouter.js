const {Router} = require("express")
const router = Router()
const Controller = require("../Controllers/AdminController")
const AuthMiddleware = require("../Middlewares/authMiddleware")

router.get("/", AuthMiddleware, Controller.Find)
router.post("/registration", Controller.Registration)
router.post('/login', Controller.Login)

module.exports = router