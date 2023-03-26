const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')


router.get('/', authController.esAutenticado, userController.index)

router.get('/users', authController.esAutenticado, userController.listar)

router.get('/crear', authController.esAutenticado, userController.crearView)
router.post('/crear', userController.crear)

router.get('/editar/:id', authController.esAutenticado, userController.editarView)
router.post('/editar', userController.editar)

router.get('/borrar/:id', authController.esAutenticado, userController.borrar)

router.get('/login', authController.loginView)
router.post('/login', authController.login)

router.get('/registro', authController.esAutenticado, authController.registroView)
router.post('/registro', authController.registro)


router.get('/salir', authController.salir)



module.exports = router