const express = require('express')
const app = express()
const router = require('./routes/router')
const path = require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const multer = require('module')

dotenv.config({
    path: './env/.env'
})

app.set('view engine', 'ejs')

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname).toLocaleLowerCase())
    }
})

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/img'),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|png|gif/
        const mimeType = fileTypes.test(file.mimetipe)
        const extName = fileTypes.test(path.extname(file.originalname))
        if (mimeType && extName) {
            return cb(null, true)
        }
        cb('Error:img no valida')
    }
}).single('image'))

app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())

app.use('/', router)
app.use(express.static(path.join(__dirname, '/public')))

app.listen(3000, () => {
    console.log('SERVER on PORT:3000')
})