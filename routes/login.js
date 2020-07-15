const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')

const jwt = require('jsonwebtoken')

const app = express()
const Usuario = require('../models/usuario');

app.post('/login', (req, res) => {
    let body = req.body;
    Usuario.findOne({}, (err, usuarioDB) => {
        //si existe un error en la BD u otra cosa en el servidor
        if (err) {
            //Error que está incorrecta la petición err 500
            return res.status(500).json({
                ok: false,
                err
            })
        }
        //si no existe el usuario en la BD
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "(Usuario) o contraseña incorrectos"
                }
            })
        }
        //verificar si las contraseñas coinciden
        if (bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o (contraseña) incorrectos",
                    comp: body.password,
                    comp2: usuarioDB.password
                }
            })
        }
        //Generar el token 
        //cabecera y firma no lo hacemos, solo el contenido 
        let token = jwt.sign({
                usuario: usuarioDB,
                //semilla: cadena de caracteres que permite encripta (seed)
                //mientras mas largo sea el nombre es mas seguro
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN } /*{expiresIn: '1h'}*/ )
            //respuesta correcta
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    })

})


module.exports = app