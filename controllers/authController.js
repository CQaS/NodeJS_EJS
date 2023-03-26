const jwt = require('jsonwebtoken')
const encript = require('bcryptjs')
const {
    promisify
} = require('util')
const conexion = require('../database/db')
const userModel = require('../models/userModel')
const nodemailer = require('nodemailer')

exports.loginView = (req, res) => {
    res.render('login', {
        alert: false
    })
}

exports.login = (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        if (!email || !password) {

            res.render('login', {
                alert: true,
                alertMsg: 'Faltan Datos!. Completa el Form'
            })

        } else {
            userModel.loginUser(email, password)
        }

    } catch (err) {}



}

exports.registroView = (req, res) => {
    if (row.rol == 'admin') {
        res.render('registro', {
            alert: false
        })

    } else {
        res.render('index', {
            userName: row.name
        })
    }

}

exports.registro = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body

        if (!name || !email || !password) {
            res.render('registro', {
                alert: true,
                alertMsg: 'Ingresa Todos los datos'
            })
        } else {
            let passHash = await encript.hash(password, 10)

            userModel.registrar(name, email, passHash, res)
        }


    } catch (err) {
        console.error(err)
    }
}

exports.esAutenticado = async (req, res, next) => {
    if (res.cookies.jwt) {
        try {

            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            userModel.cook(decodificada.id, req, next)

        } catch (err) {
            console.log(err)
            return next()
        }

    } else {
        res.redirect('/login')
    }
}


exports.salir = (req, res) => {
    res.clearCookie('jwt')
    return res.redirect('/login')
}