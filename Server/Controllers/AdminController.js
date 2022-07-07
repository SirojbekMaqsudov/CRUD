const User = require('../Models/AdminModel')
const Validate = require('../Validators/AdminValidate')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const generateJWT = (user) => {
    return jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '30d'})
}

class AdminController {

    async Registration(req, res) {
        try {
            const {username, password} = req.body

            const candidate = await User.findOne({username})

            if (candidate) {
                return res.json({error: "User Exist"})
            }

            const {error} = Validate(req.body)

            if (error) {
                return res.json({error: error.details[0].message})
            }

            const hashPassword = await bcrypt.hash(password, 8)

            const user = new User({
                username, password: hashPassword
            })

            const savedUser = await user.save()

            const token = generateJWT(savedUser)

            return res.json({token})
        } catch (e) {
            console.log(e)
        }
    }

    async Login(req, res) {
        try {
            const {username, password} = req.body

            const user = await User.findOne({username})

            if (!user) {
                return res.json({error: "User Not Found"})
            }

            const compare = await bcrypt.compare(password, user.password)

            if (!compare) {
                return res.json({error: "Invalid Password"})
            }

            const token = generateJWT(user)

            return res.json({token})
        } catch (e) {
            console.log(e)
        }
    }

    async Find(req, res) {
        const users = await User.find()
        return res.json(users)
    }
}


module.exports = new AdminController()