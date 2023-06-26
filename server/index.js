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

const PORT = 4000

const salt = bcrypt.genSaltSync(10)
const secret = 'salkdjfhsk2345rfgd324'

app.use(cors({ 
    credentials: true, 
    origin: 'http://localhost:3000' 
}))
app.use(express.json())
app.use(cookieParser())

const db = (async function() {
    await mongoose.connect('mongodb+srv://laraalexander:5ncMtOXbr6FiyTH5@big-rig-cookbook.qzimbog.mongodb.net/big-rig-cookbook?retryWrites=true&w=majority')
    console.log('Connected to the DB')
}())

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const userDoc = await User.create({
            username,
            // Encrypt password
            password:bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)
    } catch(err) {
        res.status(400).json(err)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const userDoc = await User.findOne({ username })
    // Check if password matches encrypted password in db
    const passOk = bcrypt.compareSync(password, userDoc.password)

    if (passOk) {
        // Create session token
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username
            })
        })
    } else {
        res.status(400).json('Wrong credentials')
    }
})

app.get('/profile', (req, res) => {
    // Grab token from cookies (from Header.js)
    const { token } = req.cookies

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err
        res.json(info)
    })

    // res.json(req.cookies)
})

app.post('/createpost', uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file
    const parts = originalname.split('.')
    const ext = parts[parts.length-1]
    const newPath = path+'.'+ext
    fs.renameSync(path, newPath)

    const { title, summary, content } = req.body
    const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
    })

    res.json({ postDoc })
})

app.get('/viewposts', async (req, res) => {
    const posts = await Post.find()
    res.json(posts)
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('Logged Out')
})

app.get('/test', (req, res) => {
    res.json(`Server is running on post ${PORT}`)
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

