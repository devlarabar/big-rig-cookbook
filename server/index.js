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

// ***************************** User Profile

app.get('/user/:username', async (req, res) => {
    // Grab token from cookies (from Header.js)
    const username = req.params.username
    const { token } = req.cookies
    
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err
        res.json(info)
    })

    const userDoc = (await User.find({ username: username }))
    
    res.json(userDoc)
})

app.get('/getuserdata_un/:username', async (req, res) => {
    const username = req.params.username
    const userDoc = await User.findOne({ username })
    const response = {
        id: userDoc._id,
        username: userDoc.username,
        savedPosts: userDoc.savedPosts
    }
    res.json(response)
})

// ***************************** Create & Update Posts

app.post('/createpost', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = ''
    if (req.file) {
        const { originalname, path } = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path + '.' + ext
        fs.renameSync(path, newPath)
    }

    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err
        const { title, summary, content, ingredients } = req.body
        const postDoc = await Post.create({
            title,
            summary,
            content,
            ingredients,
            cover: newPath,
            author: info.id,
        })
        res.json({ postDoc })
    })
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null
    if (req.file) {
        // refactor this so no copy/paste
        if (req.file) {
            const { originalname, path } = req.file
            const parts = originalname.split('.')
            const ext = parts[parts.length - 1]
            newPath = path + '.' + ext
            fs.renameSync(path, newPath)
        }
    }

    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err
        const { id, title, summary, content, ingredients } = req.body
        const postDoc = await Post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)

        if (!isAuthor) {
            return res.status(400).json('You are not the author of this post!')
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            ingredients,
            cover: newPath ? newPath : postDoc.cover,
        });

        res.json(postDoc)
    })
})

// ***************************** View Posts

app.get('/viewposts', async (req, res) => {
    const posts = await Post
        .find()
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20)
    res.json(posts)
})

app.get('/viewposts/:author', async (req, res) => {
    const authorUsername = req.params.author ? req.params.author : null
    const author = (await User.find({ username: authorUsername }))
    const posts = await Post
        .find({ author: author })
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(20)
    res.json(posts)
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params
    const postDoc = await Post.findById(id).populate('author', ['username'])
    res.json(postDoc)
})

// ***************************** Save Posts, Get Saved Posts from User

app.put('/savepost', async (req, res) => {
    const postId = req.body.post
    const userId = req.body.user
    // const postDoc = await Post.findById(postId)
    const userDoc = await User.findById(userId)

    if (userDoc.savedPosts?.includes(postId)) {
        newSavedPosts = userDoc.savedPosts.filter(x => x != postId)
        await userDoc.updateOne({
            savedPosts: [ ... newSavedPosts ]
        });
        res.json(`Post id ${postId} removed.`)
    } else {
        await userDoc.updateOne({
            savedPosts: [...userDoc.savedPosts, postId]
        }, { upsert: true });
        res.json(`Post id ${postId} saved.`)
    }
})

app.get('/getuserdata/:id', async (req, res) => {
    const id = req.params.id
    const userDoc = await User.findById(id)
    const response = {
        id: userDoc._id,
        username: userDoc.username,
        savedPosts: userDoc.savedPosts
    }
    res.json(response)
})

// ***************************** Login, Logout, Header Profile Info

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const userDoc = await User.create({
            username,
            // Encrypt password
            password: bcrypt.hashSync(password, salt)
        })
        res.json(userDoc)
    } catch (err) {
        res.status(400).json(err)
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    const userDoc = await User.findOne({ username })

    if (userDoc === null) {
        res.status(400).json('User does not exist!')
    } else {
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
    }


})

app.get('/profile', (req, res) => {

    try {
        // Grab token from cookies (from Header.js)
        const { token } = req.cookies

        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err
            res.json(info)
        })
    } catch (err) {
        res.status(400).json(err)
    }

    // res.json(req.cookies)
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

