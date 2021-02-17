const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let multaSchema = new Schema({
    id_soc: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: [true, 'El id del socio es requerido']
    },
    multa: {
        type: String,
        required: [true, 'El valor de la multa es requerido']
    },
    id_reu: {
        type: Schema.Types.ObjectId,
        ref: "Reuniones",
        required: [true, 'El id de la reunion es requerido']
    }
});


module.exports = mongoose.model('Multa', multaSchema);





