//importación de módulos
require('./config/config')
const express = require('express')
const app = express()
    //instalamos 
const bodyParser = require('body-parser')
    //MidleWord -  capa intermedia entre el servidor y las peticiones que llegan
    //datos a través de la web deben estar codificados
    //se ejecuta cada vez que se haga una solicitud al servidor
    // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
    ///////////////////////////////////////////
app.get('/usuario', (req, res) => {
    res.json('get Usuario')
});

app.post('/usuario', (req, res) => {

    //obtener todo lo que venga en la petición
    let body = req.body
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "El nombre es necesario"
        })
    } else {
        res.json({
            persona: body
        });
    }


    //res.json('post Usuario')
});

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

//cambia el puerto 
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
})