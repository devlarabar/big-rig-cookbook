const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const connectDB = require('./config/database')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
require('dotenv').config({ path: './config/.env' })

connectDB()

// ***************************** Middleware
app.use(express.json())
app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
)

// ***************************** Setup Sessions - stored in MongoDB
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'supercalafragalisticexpialadocious',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: {
            secure: true, // Set to true if you're using HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
            sameSite: "none",
        }
    })
)
app.use(cookieParser("secretcode"))
app.use(passport.initialize())
app.use(passport.session())
require("./config/passport")(passport)

// ***************************** Routers

const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const recipeRoutes = require('./routes/recipe')
const stretchRoutes = require('./routes/stretch')
const dataRoutes = require('./routes/data')
const searchRoutes = require('./routes/search')
const settingsRoutes = require('./routes/settings')
const adminRoutes = require('./routes/admin')

app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/recipe', recipeRoutes)
app.use('/stretch', stretchRoutes)
app.use('/data', dataRoutes)
app.use('/search', searchRoutes)
app.use('/settings', settingsRoutes)
app.use('/admin', adminRoutes)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))