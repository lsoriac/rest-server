const express = require('express')
const bcrypt = require('bcrypt')
const app = express()
const Usuario = require('../models/usuario');
app.get('/usuario', (req, res) => {
    res.json('get Usuario')
});

app.post('/usuario', (req, res) => {

    //obtener todo lo que venga en la petición
    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //password: body.password,
        //usa un hash síncrono(espera que cumpla para continuar)
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    //dentro del método save implemento callback, q se ejecuta cuando el usuario se almacene en la bd
    usuario.save((err, usuariodb) => {
        if (err) {
            //Error que está incorrecta la petición
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuariodb
        })
        usuario.password = null
    })
});

//ruta
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        //id:id
        id
    })
});

app.delete('/usuario', (req, res) => {
    res.json('Delete Usuario')
});
module.exports = app