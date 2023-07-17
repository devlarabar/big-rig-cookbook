const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/User')
const Post = require('./models/Post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs')
require('dotenv').config()

const dbConnectionStr = process.env.DB_STRING

const PORT = 4000

const salt = bcrypt.genSaltSync(10)
const secret = 'salkdjfhsk2345rfgd324'

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/public', express.static(__dirname + '/public'))

const db = (async function () {
    await mongoose.connect(dbConnectionStr)
    console.log('Connected to the DB')
}())

// ***************************** Routers

const homeRoutes = require('./routes/home')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

app.use('/', homeRoutes)
app.use('/user', userRoutes)
app.use('/post', postRoutes)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

