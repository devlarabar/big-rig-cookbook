module.exports = {
    isAuth: (req, res) => {
        try {
            const { token } = req.cookies
            jwt.verify(token, secret, {}, (err, info) => {
                if (err) throw err
                return true
            })
        } catch (err) {
            return false
        }
    }
}