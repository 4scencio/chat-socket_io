const express = require('express')
const app = express();
const router = express.Router();
const chatAuth = require('../middlewares/chatAuth')

const rooms = {}

router.get('/', (req, res) => {
    res.render('index', {rooms: rooms})
})

router.get('/room/:room', (req, res) => {
    res.render('room', { roomName: req.params.room })
})

router.post('/', (req, res) => {
    const nickname =  req.body.nickname
    req.session.nickname = nickname
    res.redirect('/chat')
})

router.get('/chat', chatAuth, (req, res) => {
    res.render('chat', { nickname: req.session.nickname })
})

module.exports = router;