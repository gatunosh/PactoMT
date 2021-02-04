const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let roles = {
    values: ['ADMIN_ROLE', 'SOCIO_ROLE', 'CLIENTE_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    id_asociacion: {
        type: [{
            id_asociacion: {
                type: Schema.Types.ObjectId,
                ref: "Asociacion",
            },
        }, ],
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    tlfc: {
        type: String,
        required: [true, 'El telefono convencional es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    tlfm: {
        type: String,
        required: [true, 'El telefono celular es requerido']
    },
    hectareas: {
        type: Number,
        required: false
    },
    sector: {
        type: String,
        required: false
    },
    barrio: {
        type: String,
        required: false
    },
    parroquia: {
        type: String,
        required: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'SOCIO_ROLE',
        enum: roles
    }
});

// usuarioSchema.methods.toJSON = function() {
//     let user = this;
//     let userObject = user.toObject();
//     delete userObject.password;
//     return userObject;
// }

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })

module.exports = mongoose.model('Usuario', usuarioSchema);