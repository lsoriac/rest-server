//=======================
//========PUERTO=========
//=======================
//configuramos el puerto
process.env.PORT = process.env.PORT || 3000

//=======================
//========ENTORNO========
//=======================

process.env.NODE_ENV = process.env.NODE_DEF || 'dev'

//=======================
//=====BASE DE DATOS=====
//=======================

let urlBD
    /*
    if (process.env.NODE_ENV === 'dev') {
        urlBD = 'mongodb: //localhost:27017/cafe'

    } else {*/
urlBD = 'mongodb+srv://cafe_user:cafe_user123@cluster0.qartq.mongodb.net/cafe'
    //}
process.env.urlBD = urlBD