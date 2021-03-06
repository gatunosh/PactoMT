const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let productoSocioSchema = new Schema({
  id_pro: {
    type: Schema.Types.ObjectId,
    ref: "Producto",
    required: [true, "El id de la categoria es requerido"],
  },
  id_soc: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El id del usuario es requerido"],
  },
  aso_ps: {
    type: Schema.Types.ObjectId,
    ref: "Asociacion",
    required: [true, "El id de la asociacion es requerido"],
  },
  can_ps: {
    type: Number,
  },
  pre_ps: {
    type: Number,
  },
  fech_ps: {
    type: Date,
  },
  fecha_ela_pro: {
    type: Date,
  },
  fecha_cad_pro: {
    type: Date,
  },
});

module.exports = mongoose.model("ProductoSocio", productoSocioSchema);
