const express = require("express");
const app = express();
const _ = require("underscore");
const { verificaToken } = require("../middlewares/autenticacion");
const productoSocioModel = require("./../models/productoSocio");
const productoModel = require("./../models/producto");

app.get("/prodSocio", verificaToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 15;
  limite = Number(limite);

  productoSocioModel
    .find()
    .populate("id_pro")
    .populate("id_soc")
    .populate("aso_ps")
    .skip(desde)
    .limit(limite)
    .exec((err, prodSocioDB) => {
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

app.get("/prodSocio/:id", verificaToken, (req, res) => {
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

app.post("/prodSocio", verificaToken, (req, res) => {
  let body = req.body;

  let dataProdSocio = new productoSocioModel({
    id_pro: body.id_pro,
    id_soc: body.id_soc,
    aso_ps: body.aso_ps,
    can_ps: body.can_ps,
    pre_ps: body.pre_ps,
    fech_ps: body.fech_ps,
    fecha_ela_pro: body.fecha_ela_pro,
    fecha_cad_pro: body.fecha_cad_pro,
  });
  productoModel.findOneAndUpdate(
    body.id_pro,
    { $inc: { sto_pro: body.can_ps } },
    (err, productoDB) => {
      if (err) {
        res.status(400).json({
          ok: false,
          err,
        });
      }
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
    }
  );
});

app.put("/prodSocio/:id", verificaToken, (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, [
    "id_pro",
    "id_soc",
    "aso_ps",
    "can_ps",
    "pre_ps",
    "fech_ps",
    "fecha_ela_pro",
    "fecha_cad_pro",
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

app.delete("/prodSocio/:id", verificaToken, (req, res) => {
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
