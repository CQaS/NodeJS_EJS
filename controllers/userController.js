const conexion = require('../database/db')
const userModel = require('../models/userModel')

exports.listar = (req, res) => {
    userModel.selectUsers(res)
}

exports.crearView = (req, res) => {
    res.render('crear')
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
            res.redirect('/')
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
            res.render('editar', {
                user: result[0]
            })
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
            res.redirect('/')
        }
    })
}

exports.borrar = (req, res) => {
    const id = req.params.id
    conexion.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err)
            res.render('notfound')
        } else {
            res.redirect('/')
        }
    })
}