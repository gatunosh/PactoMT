const express = require("express");
const app = express();
const _ = require("underscore");
const {
  verificaToken,
  verificaRoleMaster,
} = require("../middlewares/autenticacion");
const entidadModel = require("./../models/entidad");

app.get("/entidad", [verificaToken], (req, res) => {
  entidadModel
    .find()
    .populate("cap_enti.id_cap")
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

app.get("/entidad/:id", verificaToken, (req, res) => {
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

app.post("/entidad", [verificaToken, verificaRoleMaster], (req, res) => {
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

  if ((req.usuario.role == "SUPER_ROLE")) {
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
  } else {
    res.json({
      ok: false,
      error: "Solo el super usuario puede crear entidades",
    });
  }
});

app.put("/entidad/:id", [verificaToken, verificaRoleMaster], (req, res) => {
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

  if (req.usuario.role == "SUPER_ROLE") {
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
  } else {
    res.json({
      ok: false,
      error: "Solo el super usuario puede modificar entidades",
    });
  }
});

app.delete("/entidad/:id", [verificaToken, verificaRoleMaster], (req, res) => {
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
