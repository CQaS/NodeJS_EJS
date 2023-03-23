const mysql = require('mysql')
const config = require('./config')

const conexion = mysql.createConnection(config)

conexion.connect((err) => {
    (err) ? console.error(`Error de conexion: ${err}`): console.log('Conexion OK')
})

module.exports = conexion