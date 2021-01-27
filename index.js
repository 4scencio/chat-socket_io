const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const path = require('path')
const router = require('./routes/routes')
const session = require('express-session')

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.use(express.urlencoded( {extended: true} ))
app.use(session({ secret: 'anythingsecret', cookie: { maxAge: 14_400_000 } }))

//Rotas
app.use('/', router);

//Socket_IO

    let count = 0
    
    io.on('connection', (socket) => {
        console.log(`O usuário ${socket.id} se conectou.`)
        count++
        io.emit('newPerson', count)
        console.log(count)
    
        socket.on('disconnect', () => {
            count--
            console.log(count)
            console.log(`O usuario ${socket.id} se desconectou.`)
        })

    socket.on('message', data => {
        console.log(data)
        io.emit('renderMessage', { author: data.author, message: data.message })
    })

})

//Server
server.listen(80, () => {
    console.log('Servidor [OK]')
})