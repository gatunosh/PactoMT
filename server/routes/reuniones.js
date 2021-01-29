
const express = require("express");
const app = express();
const _ = require("underscore");

const reunionesModel = require("../models/reuniones");

app.get("/reuniones", (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 15;
  limite = Number(limite);

  reunionesModel
    .find()
    .skip(desde)
    .limit(limite)
    .exec((err, reunionesDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        reuniones: reunionesDB,
      });
    });
});

app.get("/reuniones/:id", (req, res) => {
  let id = req.params.id;
  reunionesModel.findById(id, (err, reunionesDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      reuniones: reunionesDB,
    });
  });
});

app.post("/reuniones", (req, res) => {
  let body = req.body;

  let dataReuniones = new reunionesModel({
    fec_reu: body.fec_reu,
    hor_reu: body.hor_reu,
    mul_reu: body.mul_reu,
    id_asoc_reu: body.id_asoc_reu,
    asistencia: body.asistencia,
  });

  dataReuniones.save((err, reunionesDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Error al crear la reunion",
        err,
      });
    }
    res.json({
      ok: true,
      reuniones: reunionesDB,
      message: "Reunion creada correctamente",
    });
  });
});

app.put("/reuniones/:id", (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, ["fec_fac", "hor_reu", , "mul_reu", "id_soc_reu", "asistencia"]);

  reunionesModel.findByIdAndUpdate(id, body, (err, reunionesDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      reuniones: reunionesDB,
      message: "Se actualizo la reunion correctamente",
    });
  });
});

app.delete("/reuniones/:id", (req, res) => {
  let id = req.params.id;

  reunionesModel.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      message: "Se ha borrado la reunion correctamente ",
    });
  });
});

module.exports = app;
