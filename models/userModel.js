const conexion = require('../database/db')

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
            res.render('notfound')
        }
        res.redirect('/')
    })
}