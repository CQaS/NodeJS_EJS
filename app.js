const express = require('express')
const app = express()
const router = require('./routes/router')

app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))

app.use('/', router)

app.listen(3000, () => {
    console.log('SERVER on PORT:3000')
})