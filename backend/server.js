const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')

const viewRoutes = require('./routes/viewRoutes')
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express()

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

const server = app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})
