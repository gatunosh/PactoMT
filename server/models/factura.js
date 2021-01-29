const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let facturaSchema = new Schema({
  id_cli: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El id del cliente es requerido"],
  },
  fec_fac: {
    type: Date,
    required: [true, "La fecha es requerida"],
  },
  tot_fac: {
    type: Number,
    required: [true, "El total es requerido"],
  },
  detalle: {
    required: [true, "El detalle es requerido"],
    type: [
      {
        id_pro: {
          type: Schema.Types.ObjectId,
          ref: "Producto",
          required: [true, "El id del producto es requerido"],
        },
        cantidad: {
          type: Number,
          required: [true, "El la cantidad es requerido"],
        },
        subtotal: {
          type: Number,
          required: [true, "El subtotal es requerido"],
        },
      },
    ],
  },
});

module.exports = mongoose.model("Factura", facturaSchema);
