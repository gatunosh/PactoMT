const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let productoSocioSchema = new Schema({
  id_pro: {
    type: mongoose.ObjectId,
    ref: "Producto",
    required: [true, "El id de la categoria es requerido"],
  },
  id_soc: {
    type: mongoose.ObjectId,
    ref: "Usuario",
    required: [true, "El id del usuario es requerido"],
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
  aso_ps: {
    type: mongoose.ObjectId,
    required: [true, "El id de la asociacion es requerido"],
  },
  estado_ps: {
    type: String,
  },
});

module.exports = mongoose.model("ProductoSocio", productoSocioSchema);
