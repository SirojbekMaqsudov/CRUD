const {Router} = require("express")
const router = Router()
const Controller = require("../Controllers/UserController")
const authMiddleware = require("../Middlewares/authMiddleware")

router.get('/', Controller.Find)
router.get('/:id', Controller.FindOne)
router.post('/create', Controller.Create)
router.put('/update/:id', Controller.Update)
router.delete('/delete/:id', Controller.Delete)

// router.get('/', authMiddleware, Controller.Find)
// router.get('/:id', authMiddleware, Controller.FindOne)
// router.post('/create', authMiddleware, Controller.Create)
// router.post('/update/:id', authMiddleware, Controller.Update)
// router.get('/delete/:id', authMiddleware, Controller.Delete)

module.exports = router