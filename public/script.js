const socket = io({
    secure: true,
    origins: "*:*",
    transports: ["websocket"]
});

        socket.on('disconnect',() => {
            console.log('Desconectado')
        })

        socket.on('showMsg', data => {
            const divChat = document.getElementById('chat')
            const p = document.createElement('p')
            console.log(data)
            p.innerHTML = `<strong>${data.username}:</strong> ${data.msg}`
            divChat.append(p)
        })

        function enviarMsg() {
            let msgField = document.getElementById('msg')
            let usernameField = document.getElementById('username')

            let msg = msgField.value
            let username = usernameField.value

            socket.emit('msg', {msg: msg, username: username})
        }

        let btn = document.getElementById('btn')
        btn.addEventListener('click', enviarMsg)