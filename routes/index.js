const express = require('express')

const app = express()
    //incluir las rutas de usuario
app.use(require('./usuario'))

app.use(require('./login'))

module.exports = app