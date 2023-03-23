const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.get('/', userController.listar)

router.get('/crear', userController.crearView)
router.post('/crear', userController.crear)

router.get('/editar/:id', userController.editarView)
router.post('/editar', userController.editar)

router.get('/borrar/:id', userController.borrar)

router.get('/users', (req, res) => {
    res.send('USERS')
})

module.exports = router