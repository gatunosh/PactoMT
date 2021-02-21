const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let asoSchema = new Schema({
    nombre_aso: {
        type: String,
        required: [true, "El nombre es requerido"],
    },
    certificado_aso: {
        type: String,
        required: [true, "El certificado es requerido"],
    },
    sector_aso: {
        type: String,
        required: [true, "El sector es requerido"],
    },
    barrio_aso: {
        type: String,
        required: [true, "El barrio es requerido"],
    },
    parroquia_aso: {
        type: String,
        required: [true, "La parroquia es requerida"],
    },
    id_soc: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Usuario",
        }, ],
    },
    logo_aso: {
        type: String
    }
});

module.exports = mongoose.model("Asociacion", asoSchema);