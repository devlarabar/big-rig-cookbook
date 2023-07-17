const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/database')
require('dotenv').config({path: './config/.env'})

const PORT = 4000
const salt = bcrypt.genSaltSync(10)

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/public', express.static(__dirname + '/public'))

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

