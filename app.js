const express = require('express')
const app = express()
const router = require('./routes/router')
const path = require('path')

app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))

app.use('/', router)
app.use(express.static(path.join(__dirname, '/public')))

app.listen(3000, () => {
    console.log('SERVER on PORT:3000')
})