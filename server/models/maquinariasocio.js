const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let maquisocSchema = new Schema({
    tipo_maq: {
        type: String,
        required: [true, 'El tipo de maquinaria es requerido']
    },
    est_maq: {
        type: String,
        required: [true, 'El estado de maquinaria es requerido']
    },
    asociacion_maq: {
        type: String,
        required: [true, 'La asociacion de la maquinaria es requerido']
    }

});



module.exports = mongoose.model('Maquinariasocio', maquisocSchema);