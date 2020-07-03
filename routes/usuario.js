const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const app = express()
const Usuario = require('../models/usuario');

app.get('/usuario', (req, res) => {
    let desde = req.query.desde || 0;
    //res.json('get Usuario')
    desde = Number(desde)
    let limite = req.query.limite || 5;
    limite = Number(limite)
    Usuario.find({ estado: true }, 'nombre email role estado google img') //////////////ojo esto del filtro
        //.skip(5) // se salta los primeros 5 registros y muestra los 5 siguientes
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                //Error que está incorrecta la petición
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            //Obtengo el número de documentos que tengo
            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    numero: conteo
                })
            })
        })
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
                //no es necesario enviar código 200
                ok: true,
                usuario: usuariodb
            })
            // usuario.password = null
    })
});

//ruta
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    //let body = req.body;
    //opción optimizada con el módulo underscore
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    //Se elimnan los parámetros que no quiero que se puden modificar mediante el PUT
    //Opcion funcional pero ineficiente según la documentación
    //delete body.password;
    //delete body.password;
    Usuario.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
            context: 'query'
        },
        (err, usuariodb) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            //en el caso que si encuentre
            res.json({
                ok: true,
                usuario: usuariodb
            })
            console.log(usuariodb)
        })
});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let cambiarEstado = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, cambiarEstado, {
            new: true,
            context: 'query',
            useFindAndModify: false
        },
        (err, usuariodb) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            if (!usuariodb) {
                res.json({
                    ok: false,
                    err: {
                        message: 'Usuario no encontrado'
                    }
                })
            } else {
                res.json({
                    ok: true,
                    message: usuariodb
                })
            }
        })
});

module.exports = app