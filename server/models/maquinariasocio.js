const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let maquisocSchema = new Schema({
    id_mant: {
        type: [{
            id_mant: {
                type: Schema.Types.ObjectId,
                ref: "Mantenimientomaqsocio",
            },
        }, ],
    },
    id_soc: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios",
    },
    nom_maq: {
        type: String,
        required: [true, "El nombre de maquinaria es requerido"],
    },
    tipo_maq: {
        type: String,
        required: [true, "El tipo de maquinaria es requerido"],
    },
    est_maq: {
        type: String,
        required: [true, "El estado de maquinaria es requerido"],
    },
});

module.exports = mongoose.model("Maquinariasocio", maquisocSchema);