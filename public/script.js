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
            p.innerHTML = `<strong>${data.username}:</strong> <i>(${data.hours})</i>: ${data.msg}`
            divChat.append(p)
        })

        var usernameField = prompt('Digite seu nome')

        function enviarMsg() {
            let msgField = document.getElementById('msg')
            // let usernameField = window.prompt('Digite seu nome')
            moment.locale('pt-br')
            let hours = moment().format('hh:mm');    
            let msg = msgField.value
            let username = usernameField

            socket.emit('msg', {msg: msg, username: username, hours: hours})
        }

        let btn = document.getElementById('btn')
        btn.addEventListener('click', enviarMsg)