const User = require("../models/User");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy(async (username, password, done) => {
            const user = await User.findOne({ username: username.toLowerCase() })
            if (!user) return done(null, false)
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
        })
    )
    passport.serializeUser((user, cb) => {
        console.log('PassportJS: Serializing user...', user.username)
        cb(null, user.id);
    })
    passport.deserializeUser(async (id, cb) => {
        console.log('PassportJS: Deserializing user...')
        const user = await User.findOne({ _id: id })
        const userInformation = {
            username: user.username,
            id: user._id,
            admin: user.admin
        }
        console.log('PassportJS Deserialization:', userInformation)
        cb(null, userInformation)
    })
}