const conexion = require('../database/db')

exports.selectUsers = (res) => {
    conexion.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error(err)
            res.render('notfound')
        } else {
            res.render('index', {
                lista: result
            })
        }
    })
}