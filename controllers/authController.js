const jwt = require('jsonwebtoken')
const encript = require('bcryptjs')
const {
    promisify
} = require('util')
const conexion = require('../database/db')
const userModel = require('../models/userModel')

exports.salir = (req, res) => {
    console.log('salir')
}

exports.loginView = (req, res) => {
    res.render('login')
}

exports.login = (req, res) => {
    const {
        email,
        password
    } = req.body

    res.render('login')
}

exports.registroView = (req, res) => {
    res.render('registro')
}

exports.registro = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body

        let passHash = await encript.hash(password, 10)

        userModel.registrar(name, email, passHash, res)

    } catch (err) {
        console.error(err)
    }
}