const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let asoSchema = new Schema({
    ID_aso: {
        type: String,
        required: [true, 'La ID es requerida']
    },
    nombre_aso: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    Certificado_aso: {
        type: String,
        required: [true, 'El certificado es requerido']
    },
    sector_aso: {
        type: String,
        required: [true,'El sector es requerido']
    },
    barrio_aso: {
        type: String,
        required: [true,'El barrio es requerido']
    },
    parroquia_aso: {
        type: String,
        required: [true,'La parroquia es requerida']
    }
 
});

asoSchema.methods.toJSON = function() {
    let aso = this;
    let asoObject = aso.toObject();
    delete asoObject.password;
    return asoObject;
}

asoSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })

module.exports = mongoose.model('Asociacion', asoSchema);
