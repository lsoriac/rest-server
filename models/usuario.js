const mongoose = require('mongoose')
let uniqueValidator = require('mongoose-unique-validator');
//lista para campo role(enum)
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    email: {
        type: String,
        required: [true, "El correo es requerido"],
        unique: true

    },
    password: {
        type: String,
        required: [true, "El password es requerido"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    //nos permitirá hacer una autenticación a través de google
    google: {
        type: Boolean,
        default: false
    }
})

//validación que se único
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
//Redefine el método toJSON, se copia el objeto, se elimina el campo password y se devuelve el objeto originar:
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);