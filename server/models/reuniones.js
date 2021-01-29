const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let reuSchema = new Schema({
  fec_reu: {
    type: Date,
    required: [true, "La fecha es requerido"],
  },
  hor_reu: {
    type: String,
    required: [true, "La hora es requerido"],
  },
  mul_reu: {
    type: String,
    required: [true, "La multa es requerido"],
  },
  id_asoc_reu: {
    type: Schema.Types.ObjectId,
    ref:"Asociacion",
    required: [true, "La id de la asociacion es requerido"],
  },
  asistencia: {
    required: [true, "La asistencia es requerida"],
    type: [
      {
        id_soc: {
          type: Schema.Types.ObjectId,
          ref: "Usuario",
          required: [true, "El id del socio es requerido"],
        },
        asist_socio: {
          type: Boolean,
          required: [true, "La asistencia es requerido"],
        },
      },
    ],
  },

  acta: {
    type: String,
    /*El acta puede ser o no requerida*/
  },

});

module.exports = mongoose.model("Reuniones", reuSchema);