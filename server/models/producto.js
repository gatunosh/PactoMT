const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let productoSchema = new Schema({
  id_cat: {
    type: Schema.Types.ObjectId,
    ref: "CategoriaProducto",
    required: [true, "El nombre de la categoria es requerido"],
  },
  aso_ps: {
    type: Schema.Types.ObjectId,
    ref: "Asociacion",
    required: [true, "El id de la asociacion es requerido"],
  },
  nom_pro: {
    type: String,
    required: [true, "El nombre del producto es requerido"],
  },
  desc_pro: {
    type: String,
  },
  uni_pro: {
    type: String,
    required: [true, "El unitario es requerido"],
  },
  sto_pro: {
    type: Number,
  },
  pvp_pro: {
    type: Number,
    required: [true, "El precio es requerido"],
  },
});

module.exports = mongoose.model("Producto", productoSchema);
