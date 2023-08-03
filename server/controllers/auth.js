module.exports = {
    isAuth: (req, res) => {
        try {
            const { token } = req.cookies
            jwt.verify(token, secret, {}, (err, info) => {
                if (err) throw err
                return info ? true : false
            })
        } catch (err) {
            return false
        }
    }
}