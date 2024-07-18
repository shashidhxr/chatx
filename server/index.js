const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
    socket.on('user-message', message => {
        io.emit("message", message)
        console.log(message)
    })
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

server.listen(3030, () => {
    console.log("Server running at 3030")
})
