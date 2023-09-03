module.exports = {
    test: (req, res) => {
        res.json(`Server is running on port ${PORT}`, `Front-end url is ${process.env.FRONTEND_URL}`)
    }
}