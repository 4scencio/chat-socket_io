const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded( {extended: true} ))

const rooms = {}

app.get('/', (req, res) => {
    res.render('index', {rooms: rooms})
})

app.get('/room/:room', (req, res) => {
    res.render('room', { roomName: req.params.room })
})

io.on('connection', (socket) => {

    console.log(`${socket.id} se conectou`)

    socket.on('disconnect', () => {
        console.log(`${socket.id} se desconectou`)
    })

    socket.on('msg', (data) => {
        io.emit('showMsg', data)
        console.log(data)
    })
})

server.listen(3000, () => {
    console.log('Servidor [OK]')
})