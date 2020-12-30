const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let directivaSchema = new Schema({
    cargo: {
        type: String,
        unique: true,
        required: [true, 'El cargo es requerido']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    periodo: {
        type: String,
        required: [true, 'El periodo es requerido']
    },
});

directivaSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    return userObject;
}

module.exports = mongoose.model('Directiva', directivaSchema);
