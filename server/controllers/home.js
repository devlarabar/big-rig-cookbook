const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = 'salkdjfhsk2345rfgd324'

module.exports = {
    register: async (req, res) => {
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
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const userDoc = await User.findOne({ username }).populate('achievements')
        const admin = userDoc.admin
        const achievements = userDoc.achievements
    
        if (userDoc === null) {
            res.status(400).json('User does not exist!')
        } else {
            // Check if password matches encrypted password in db
            const passOk = bcrypt.compareSync(password, userDoc.password)
    
            if (passOk) {
                // Create session token
                jwt.sign({ username, id: userDoc._id, achievements, admin }, secret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({
                        id: userDoc._id,
                        username,
                        achievements,
                        admin
                    })
                })
            } else {
                res.status(400).json('Wrong credentials')
            }
        }
    },
    logout: (req, res) => {
        res.cookie('token', '').json('Logged Out')
    },
    test: (req, res) => {
        res.json(`Server is running on post ${PORT}`)
    }
}