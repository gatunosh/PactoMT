const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let capacitacionSchema = new Schema({
  prof_cap: {
    type: [
      {
        id_enti: {
          type: Schema.Types.ObjectId,
          ref: "Entidades",
          required: [true, "Se requiere el id de la entidad capacitadora"],
        },
      },
    ],
  },
  tem_cap: {
    type: String,
    required: [true, "Tema de capacitacion requerido"],
  },
  fech_ini_cap: {
    type: Date,
    required: [true, "Fecha inicio de capacitacion requerido"],
  },
  fech_fin_cap: {
    type: Date,
    required: [true, "Fecha fin de capacitacion requerido"],
  },
  hora_ini_cap: {
    type: String,
    required: [true, "Hora inicio de capacitacion requerido"],
  },
  hora_fin_cap: {
    type: String,
    required: [true, "Hora fin de capacitacion requerido"],
  },
  asis_cap: {
    type: [
      {
        id_soc: {
          type: Schema.Types.ObjectId,
          ref: "Usuarios",
          required: [true, "Se requiere el id del socio"],
        },
        cert_asis: {
          type: Boolean,
        },
        cert_part: {
          type: Boolean,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Capacitaciones", capacitacionSchema);
