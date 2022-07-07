const User = require("../Models/UserModel")
const Validate = require("../Validators/userValidate")
const uuid = require('uuid')
const fs = require("fs")
const path = require("path")

class UserController {
    async Create(req, res) {
        try {
            const {firstname, lastname, phoneNumber, age, gender} = req.body
            const avatar = req.file

            const {error} = Validate(req.body)

            if (error) {
                return res.json({error: error.details[0].message})
            }

            const user = new User({
                id: uuid.v4(),
                firstname,
                lastname,
                phoneNumber,
                age,
                gender,
                avatar: avatar ? avatar.filename : 'User.png'
            })

            const savedUser = await user.save()

            return res.json(savedUser)
        } catch (e) {
            console.log(e)
        }
    }

    async Update(req, res) {
        try {
            const {firstname, lastname, phoneNumber, age, gender} = req.body
            const avatar = req.file

            const id = req.params.id

            const user = await User.findOne({id})
            if (!user) {
                return res.json({error: "User Not Found"})
            }

            const data = {
                firstname: firstname ? firstname : user.firstname,
                lastname: lastname ? lastname : user.lastname,
                phoneNumber: phoneNumber ? phoneNumber : user.phoneNumber,
                age: age ? age : user.age,
                gender: gender ? gender : user.gender,
                avatar: avatar ? avatar.filename : user.avatar
            }

            const {error} = Validate(data)

            if (error) {
                return res.json({error: error.details[0].message})
            }

            if (avatar && user.avatar !== 'User.png'){
                fs.unlink(path.resolve(__dirname, '../', 'Uploads', user.avatar), (err) => {
                    if (err) console.log(err)
                })
            }

            const updatedUser = await User.findOneAndUpdate({id}, data)

            return res.json(await User.findOne({id}))

        } catch (e) {
            console.log(e)
        }
    }

    async Find(req, res) {
        const users = await User.find()
        return res.json(users)
    }

    async Delete(req, res) {
        try{
            const {id} = req.params

            const userData = await User.findOne({id})

            if (userData){
                if (userData.avatar !== 'User.png'){
                    fs.unlink(path.resolve(__dirname, '../', 'Uploads', userData.avatar), (err) => {
                        if (err) console.log(err)
                    })
                }
            }
            const user = await User.deleteOne({id})

            return res.json(user)
        }catch (e) {
            console.log(e)
        }
    }

    async FindOne(req, res) {
        const {id} = req.params

        const user = await User.findOne({id})
        return res.json(user)
    }
}

module.exports = new UserController()