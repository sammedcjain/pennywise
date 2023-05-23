const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/pennywise/user/login')
    }

    next()
}
const setCurrentUser = (req, res, next) => {
    res.locals.currentUser = req.user
    next()
}
module.exports = { isLoggedIn, setCurrentUser }