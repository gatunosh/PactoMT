const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let tipo_reu_enum = {
  values: ["Ordinaria", "Extraordinaria", "Otros"],
  message: "{VALUE} no es un tipo de reunión válida",
};

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
    ref: "Asociacion",
    required: [true, "La id de la asociacion es requerido"],
  },
  asistencia: {
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
  tema_reun: {
    type: String,
    required: [true, "El tema es requerido"],
  },
  tipo_reun: {
    type: String,
    default: "Ordinaria",
    tipo_reu_enum: tipo_reu_enum,
  },
});

module.exports = mongoose.model("Reuniones", reuSchema);
