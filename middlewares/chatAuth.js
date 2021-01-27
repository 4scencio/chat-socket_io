const chatAuth = (req, res, next) => {
    if(req.session.nickname){
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = chatAuth