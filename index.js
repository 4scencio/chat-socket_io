const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs')

io.on('connection', (socket) => {

    console.log(`${socket.id} se conectou`)

    socket.on('disconnect', () => {
        console.log(`${socket.id} se desconectou`)
    })

    socket.on('msg', (data) => {
        socket.emit('showMsg', data)
        console.log(data)
    })
})

app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index')
})

http.listen(3000, () => {
    console.log('Servidor [OK]')
})