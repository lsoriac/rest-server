const jwt = require('jsonwebtoken')
    //===========================
    //Verificar token}
    //===========================

//next->que es lo que se ejecutará después que el token sea valido 
let verificarToken = (req, res, next) => {
    //se envia dentor del header
    let token = req.get('token');

    //console.log(token);
    //permite verificar si el token es correcto
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            //401 error de autenticación
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no válido'
                }
            })
        }

        //find by id y seleccionar el campo role 

        //guardano el usuario codificado dentero de la petición del usuario
        req.usuario = decoded.usuario
        next()
    })

    /*
    res.json({
        token
    })*/
}

//===========================
//Verificar admin role
//===========================
let verificarAdminRole = (req, res, next) => {
    let usuario = req.usuario
    if (usuario.role === 'ADMIN_ROLE') {
        next()
    } else {
        //puede ser otro codigo
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        })
    }
}
module.exports = {
    verificarToken,
    verificarAdminRole
}