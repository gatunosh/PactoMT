const express = require("express");
const app = express();
const _ = require("underscore");

const entidadModel = require("./../models/entidad");

app.get("/entidad", (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 15;
  limite = Number(limite);

  entidadModel
    .find()
    .skip(desde)
    .limit(limite)
    .exec((err, entidadDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        entidad: entidadDB,
      });
    });
});

app.get("/entidad/:id", (req, res) => {
  let id = req.params.id;
  entidadModel.findById(id, (err, entidadDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      entidad: entidadDB,
    });
  });
});

app.post("/entidad", (req, res) => {
  let body = req.body;

  let dataEntidad = new entidadModel({
    cap_enti: body.cap_enti,
    nom_enti: body.nom_enti,
    tipo_enti: body.tipo_enti,
    dir_enti: body.dir_enti,
    tel_enti: body.tel_enti,
    pais_enti: body.pais_enti,
    ciu_enti: body.ciu_enti,
  });

  dataEntidad.save((err, entidadDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Error al crear la entidad",
        err,
      });
    }
    res.json({
      ok: true,
      entidad: entidadDB,
      message: "Entidad creada correctamente",
    });
  });
});

app.put("/entidad/:id", (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, [
    "cap_enti",
    "nom_enti",
    "tipo_enti",
    "dir_enti",
    "tel_enti",
    "pais_enti",
    "ciu_enti",
  ]);

  entidadModel.findByIdAndUpdate(id, body, (err, entidadDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      entidad: entidadDB,
      message: "Se actualizo la entidad",
    });
  });
});

app.delete("/entidad/:id", (req, res) => {
  let id = req.params.id;

  entidadModel.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      message: "Se ha borrado la entidad",
    });
  });
});

module.exports = app;
