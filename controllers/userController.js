const conexion = require('../database/db')
const userModel = require('../models/userModel')

exports.index = (req, res) => {
    res.render('index', {
        userName: row.name
    })
    res.render('index', {
        userName: row.name
    })
}

exports.listar = (req, res) => {
    if (row.rol == 'admin') {
        userModel.selectUsers(res)

    } else {
        res.render('index', {
            userName: row.name
        })
    }

}

exports.crearView = (req, res) => {
    if (row.rol == 'admin') {
        res.render('crear')
    } else {
        res.render('index', {
            userName: row.name
        })
    }

}

exports.crear = (req, res) => {
    const {
        name,
        email,
        rol
    } = req.body

    conexion.query('INSERT INTO users SET ?', {
        name: name,
        email: email,
        rol: rol
    }, (err, result) => {
        if (err) {
            console.error(err)
            res.render('notfound')
        } else {
            res.redirect('/users')
        }
    })
}

exports.editarView = (req, res) => {
    const id = req.params.id
    conexion.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            res.render('notfound')
        } else {
            if (row.rol == 'admin') {
                res.render('editar', {
                    user: result[0]
                })
            } else {
                res.render('index', {
                    userName: row.name
                })
            }
        }
    })
}

exports.editar = (req, res) => {
    const {
        id,
        name,
        email,
        rol
    } = req.body

    conexion.query('UPDATE users SET ? WHERE id = ?', [{
        name: name,
        email: email,
        rol: rol
    }, id], (err, result) => {
        if (err) {
            console.error(err)
            res.render('notfound')
        } else {
            res.redirect('/users')
        }
    })
}

exports.borrar = (req, res) => {
    if (row.rol == 'admin') {
        const id = req.params.id
        conexion.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error(err)
                res.render('notfound')
            } else {
                res.redirect('/users')
            }
        })

    } else {
        res.render('index', {
            userName: row.name
        })
    }

}