const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let entidadSchema = new Schema({
  nom_enti: {
    type: String,
    required: [true, "Nombre de entidad requerido"],
  },
  tipo_enti: {
    type: String,
    required: [true, "Tipo de entidad requerida"],
  },
  dir_enti: {
    type: String,
  },
  tel_enti: {
    type: String,
    required: [true, "Numero de entidad requerido"],
  },
  pais_enti: {
    type: String,
    required: [true, "Pais de entidad requerido"],
  },
  ciu_enti: {
    type: String,
    required: [true, "Ciudad de entidad requerido"],
  },
});

module.exports = mongoose.model("Entidades", entidadSchema);
