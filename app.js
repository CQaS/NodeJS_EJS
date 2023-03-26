const express = require('express')
const app = express()
const router = require('./routes/router')
const path = require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config({
    path: './env/.env'
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())

app.use('/', router)
app.use(express.static(path.join(__dirname, '/public')))

app.listen(3000, () => {
    console.log('SERVER on PORT:3000')
})