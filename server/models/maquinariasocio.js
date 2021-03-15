const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let maquisocSchema = new Schema({
    
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
    asociacion_maq: {
         type: String,
        required: [true, "La asosiacion de maquinaria es requerido"],
    },
    marca_man_maq: {
        type: String,
        required: [true, "La marca de la maquinaria es requerido"],
      },
      km_man_maq: {
        type: String,
        required: [true, "El kilometraje de la maquinaria es requerido"],
      },
      placa_man_maq: {
        type: String,
        required: [true, "El costo del mantenimiento es requerido"],
      },
      origen_man_maq: {
        type: String,
        required: [true, "El costo del mantenimiento es requerido"],
      },
});

module.exports = mongoose.model("Maquinariasocio", maquisocSchema);
