const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let categoriaProductoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la categoria es requerido"],
  },
  descripcion: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("CategoriaProducto", categoriaProductoSchema);
