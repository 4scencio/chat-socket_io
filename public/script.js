const socket = io({
    secure: true,
    origins: "*:*",
    transports: ["websocket"]
});

        const nickname = document.querySelector('#nickname').value

        const sendInput = document.querySelector('#sendInput')

        const sendMessage = () => {
            const message = sendInput.value.trim()

            if(!message) return
            sendInput.value = ''

            socket.emit('message', { author: nickname, message: message })
        }

            socket.on('msg', (data) => {
                io.emit('showMsg', data)
            })

        socket.on('connect', () => {
            console.log(socket.id)
            const chat = document.querySelector('#chat') 
            const message = document.createElement('p')
            const hours = moment().format('hh:mm');
        
            message.innerHTML = `<strong> <center> - Bem-vindo ao chat</strong> MSX -> 👌`
        
            chat.append(message)
            chat.scrollTop = chat.scrollHeight
        })

        socket.on('disconnect',() => {
            console.log('Desconectado')
        })

        socket.on('renderMessage', (data) => {
            const chat = document.querySelector('#chat') 
            const message = document.createElement('p')
            let hours = moment().format('hh:mm');
        
            message.innerHTML = `<i>(${hours})</i> ${data.author}: ${data.message}`
        
            chat.append(message)
            chat.scrollTop = chat.scrollHeight
        })
        
            socket.on('newPerson', count => {
                const online = document.getElementById('online')
                online.innerHTML = `Usuários <style="color: green">online</style>: ${count}`


        //Enviar Mensagens        
        sendInput.addEventListener('keyup',e => {
            if(e.key === 'Enter') sendMessage()
        })
    })