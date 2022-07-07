const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")

const authRouter = require("./Routes/AuthRouter")
const blogRouter = require('./Routes/BlogRouter')
const userRouter = require("./Routes/userRouter")

const app = express()
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_URL).then(() => console.log("Connected"))

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Routes
app.use("/auth", authRouter)
app.use("/blogs", blogRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
})