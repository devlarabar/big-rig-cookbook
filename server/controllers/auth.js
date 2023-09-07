const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

module.exports = {
    register: async (req, res) => {
        console.log(req.body.username)
        const doc = await User.findOne({ username: req.body.username })
        if (doc) res.send('User Already Exists')
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
                email: req.body.email,
                admin: false
            })
            await newUser.save()
            res.send('User Created')
        }
    },
    login: async (req, res) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) throw err
            if (!user) res.send('No User Exists')
            else {
                req.logIn(user, (err) => {
                    if (err) throw err
                    res.send('Successfully Authenticated')
                    console.log('Successfully Authenticated', req.user)
                })
            }
        })(req, res)
    },
    logout: (req, res, next) => {
        req.logout(() => {
            if (process.env.NODE_ENV !== 'test') console.log('User has logged out.')
        })
        req.session.destroy(err => {
            if (err && process.env.NODE_ENV !== "test")
                console.log('Error : Failed to destroy the session during logout.', next(err))
            req.user = null
            return res.json({ message: 'Logout successful.' })
        })
    },
    getUser: (req, res) => {
        console.log('getUser:', req.user || 'None')
        res.send(req.user)
    },
}