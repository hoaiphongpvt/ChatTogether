const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
const WebSocket = require('ws')

const viewRoutes = require('./routes/viewRoutes')
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express()
const server = require('http').createServer(app)
const wss = new WebSocket.Server({ server })

//View engine
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//Serving static files
app.use(express.static(path.join(__dirname, 'public')))

dotenv.config({
    path: './config.env',
})

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3000
const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log('Database connection succesfully!')
})

//ROUTES
app.use('/', viewRoutes)
app.use('/api/user', userRoutes)
app.use('/api/message', messageRoutes)

// Thêm xử lý WebSocket connection
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log(message)
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send('reload') // Gửi thông điệp "reload" đến các máy khách khác
            }
        })
    })
})

server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})
