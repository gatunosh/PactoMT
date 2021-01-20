const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let manmaquisocSchema = new Schema({
    tipo_man_maq: {
        type: String,
        required: [true, 'El tipo de maquinaria es requerido']
    },
    des_man_maq: {
        type: String,
        required: [true, 'La descripcion de la maquinaria es requerida']
    },
    check_man_maq: {
        type: String,
        required: [true, 'El chequeo de la maquinaria es requerido']
    }

});



module.exports = mongoose.model('Mantenimientomaqsocio', manmaquisocSchema);