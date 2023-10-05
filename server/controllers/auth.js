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
            const hashedAnswer1 = await bcrypt.hash(req.body.answer1.toLowerCase(), 10)
            const hashedAnswer2 = await bcrypt.hash(req.body.answer2.toLowerCase(), 10)

            const newUser = new User({
                username: req.body.username.toLowerCase(),
                password: hashedPassword,
                securityQuestions: [{
                    question: req.body.question1,
                    answer: hashedAnswer1
                }, {
                    question: req.body.question2,
                    answer: hashedAnswer2
                }],
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
                res.setHeader('Access-Control-Allow-Credentials', 'true')
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
        console.log('getUser function is running...', req.sessionID, req.session)
        console.log('getUser:', req.user || 'None')
        res.send(req.user)
    },
    checkUsername: async (req, res) => {
        const user = await User.findOne({ username: req.params.username })
        if (user) res.send({ exists: true })
        else res.send({ exists: false })
    },
    getQuestions: async (req, res) => {
        const user = await User.findOne({ username: req.params.username.toLowerCase() })
        if (!user) res.send({ userExists: false })
        else res.send({ userExists: true, questions: user.securityQuestions })
    },
    validateQuestions: async (req, res) => {
        const user = await User.findOne({ username: req.params.username.toLowerCase() })
        const answers = Object.keys(req.body.answers)
        if (!user) res.send({ userExists: false })
        else {
            const correctAnswers = []
            for (let i = 0; i < answers.length; i++) {
                const result = await bcrypt.compare(req.body.answers[answers[i]].toLowerCase(), user.securityQuestions[i].answer)
                correctAnswers.push(result === true ? true : false)
            }
            const isValidated = correctAnswers.every(x => x === true)
            console.log(isValidated
                ? `Validated security questions for user "${user.username}"`
                : `ALERT: Someone incorrectly answered security questions for user "${user.username}"`)
            return res.json({ validated: isValidated })
        }
    },
    changePassword: async (req, res) => {
        const user = await User.findOne({ username: req.params.username.toLowerCase() })
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        try {
            await user.updateOne({ password: hashedPassword })
            res.send({ success: true })
        } catch (err) {
            res.send({ success: false, error: err })
        }
    }
}