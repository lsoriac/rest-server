//importación de módulos
require('./config/config')
const express = require('express')

//módulo para manejar la bd
const mongoose = require('mongoose');
const app = express()

//instalamos 
const bodyParser = require('body-parser')

//MiddleWare -  capa intermedia entre el servidor y las peticiones que llegan
//datos a través de la web deben estar codificados
//se ejecuta cada vez que se haga una solicitud al servidor
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//incluir las rutas de usuario
app.use(require('../routes/index'))

//conexión con Mongo db
mongoose.connect(process.env.urlBD, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err
    console.log("Base de datos Online")
})

//cambia el puerto 
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
})