const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let manmaquisocSchema = new Schema({
  id_maq_soc: {
    type: [
      {
        id_maq_soc: {
          type: Schema.Types.ObjectId,
          ref: "Maquinariasocio",
        },
      },
    ],
  },
  
  fech_man_maq: {
    type: Date,
    required: [true, "La fecha del mantenimiento es requerida"],
  },
  tipo_man_maq: {
    type: String,
    required: [true, "El tipo de maquinaria es requerido"],
  },
  des_man_maq: {
    type: String,
    required: [true, "La descripcion de la maquinaria es requerida"],
  },
  check_man_maq: {
    type: String,
    required: [true, "El chequeo de la maquinaria es requerido"],
  },
  costo_man_maq: {
    type: Number,
    required: [true, "El costo del mantenimiento es requerido"],
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

module.exports = mongoose.model("Mantenimientomaqsocio", manmaquisocSchema);
