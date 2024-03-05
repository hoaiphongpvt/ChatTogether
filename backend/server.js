const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const fs = require('fs')

const homeRoutes = require('./routes/homeRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

dotenv.config({
    path: './config.env',
})

app.use(express.json())

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 3000
const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log('Database connection succesfully!')
})

//ROUTES
app.use('/', homeRoutes)
app.use('/api/user', userRoutes)

const server = app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})
