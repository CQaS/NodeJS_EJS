const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')


router.get('/', authController.esAutenticado, userController.index)

router.get('/users', userController.listar)

router.get('/crear', userController.crearView)
router.post('/crear', userController.crear)

router.get('/editar/:id', userController.editarView)
router.post('/editar', userController.editar)

router.get('/borrar/:id', userController.borrar)

router.get('/login', authController.loginView)
router.post('/login', authController.login)

router.get('/registro', authController.registroView)
router.post('/registro', authController.registro)

router.get('/salir', authController.salir)



module.exports = router