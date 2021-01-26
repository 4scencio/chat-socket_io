const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs')

io.on('connection', (socket) => {

    socket.on('event01',  (data) => {
        console.log(data)
    })

    console.log(`${socket.id} se conectou`)

    socket.on('disconnect', () => {
        console.log(`${socket.id} se desconectou`)
    })
})


app.get('/', (req, res) => {
    res.render('index')
})

http.listen(80, () => {
    console.log('Servidor [OK]')
})