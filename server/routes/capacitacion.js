const express = require("express");
const app = express();
const _ = require("underscore");

const capacitacionModel = require("./../models/capacitacion");

app.get("/capacitacion", (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 15;
  limite = Number(limite);
  capacitacionModel
    .find()
    .skip(desde)
    .limit(limite)
    .exec((err, capacitacionDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        capacitacion: capacitacionDB,
      });
    });
});

app.get("/capacitacion/:id", (req, res) => {
  let id = req.params.id;
  capacitacionModel.findById(id, (err, capacitacionDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      capacitacion: capacitacionDB,
    });
  });
});

app.post("/capacitacion", (req, res) => {
  let body = req.body;

  let dataCapacitacion = new capacitacionModel({
    prof_cap: body.prof_cap,
    tem_cap: body.tem_cap,
    fech_ini_cap: body.fech_ini_cap,
    fech_fin_cap: body.fech_fin_cap,
    hora_ini_cap: body.hora_ini_cap,
    hora_fin_cap: body.hora_fin_cap,
    asis_cap: body.asis_cap,
  });

  dataCapacitacion.save((err, capacitacionDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Error al crear la capacitacion",
        err,
      });
    }
    res.json({
      ok: true,
      capacitacion: capacitacionDB,
      message: "Capacitacion creada correctamente",
    });
  });
});

app.put("/capacitacion/:id", (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, [
    "prof_cap",
    "tem_cap",
    "fech_ini_cap",
    "fech_fin_cap",
    "hora_ini_cap",
    "hora_fin_cap",
    "asis_cap",
  ]);

  capacitacionModel.findByIdAndUpdate(id, body, (err, capacitacionDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      capacitacion: capacitacionDB,
      message: "Se actualizo la entidad",
    });
  });
});

app.delete("/capacitacion/:id", (req, res) => {
  let id = req.params.id;

  capacitacionModel.findOneAndDelete(id, (err) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      message: "Se ha borrado la capacitacion",
    });
  });
});

module.exports = app;
