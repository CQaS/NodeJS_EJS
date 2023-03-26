const conexion = require('../database/db')
const encript = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.selectUsers = (res) => {
    conexion.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error(err)
            res.render('notfound')
        } else {
            res.render('users', {
                lista: result
            })
        }
    })
}

exports.registrar = (name, email, password, res) => {
    conexion.query('INSERT INTO users SET ?', {
        name,
        email,
        password
    }, (err, result) => {
        if (err) {
            console.error(err)
            res.render('registro', {
                alert: true,
                alertMsg: 'E-mail invalido'
            })
        } else {
            res.redirect('/')
        }
    })
}

exports.loginUser = (email, password) => {
    conexion.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (result == 0 || !(await encript.compare(password, result[0].password))) {
            res.render('login', {
                alert: true,
                alertMsg: 'Email o Password incorrectos'
            })

        } else {
            const id = result[0].id
            const token = jwt.sign({
                id: id
            }, process.env.JWT_SECRETO, {
                expiresIn: process.env.JWT_EXPIRATION_TIME
            })
            const cookiesOptions = {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 100),
                httpOnly: true
            }

            res.cookie('jwt', token, cookiesOptions)
            res.render('login', {})
        }
    })
}


exports.cook = (id, req, next) => {
    conexion.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (!err) {
            return next()
            req.name = result[0]
            return next()
        }

    })
}