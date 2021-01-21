const express = require("express");
const app = express();
const _ = require("underscore");

const productoSocioModel = require("./../models/productoSocio");

app.get("/prodSocio", (req, res) => {
  productoSocioModel.find((err, prodSocioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      prodSocio: prodSocioDB,
    });
  });
});

app.get("/prodSocio/:id", (req, res) => {
  let id = req.params.id;
  productoSocioModel.findById(id, (err, prodSocioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      prodSocio: prodSocioDB,
    });
  });
});

app.post("/prodSocio", (req, res) => {
  let body = req.body;

  let dataProdSocio = new productoSocioModel({
    id_pro: body.id_pro,
    id_soc: body.id_soc,
    can_ps: body.can_ps,
    pre_ps: body.pre_ps,
    fech_ps: body.fech_ps,
    aso_ps: body.aso_ps,
    estado_ps: body.estado_ps,
  });

  dataProdSocio.save((err, prodSocioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Error al crear el producto",
        err,
      });
    }
    res.json({
      ok: true,
      prodSocio: prodSocioDB,
      message: "Se ha creada el producto",
    });
  });
});

app.put("/prodSocio/:id", (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, [
    "id_pro",
    "id_soc",
    "can_ps",
    "pre_ps",
    "fech_ps",
    "aso_ps",
    "estado_ps",
  ]);

  productoSocioModel.findByIdAndUpdate(id, body, (err, prodSocioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      prodSocio: prodSocioDB,
      message: "Se actualizo el producto",
    });
  });
});

app.delete("/prodSocio/:id", (req, res) => {
  let id = req.params.id;

  productoSocioModel.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      message: "Se ha borrado el producto",
    });
  });
});

module.exports = app;