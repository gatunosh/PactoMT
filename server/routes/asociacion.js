const express = require("express");
const _ = require("underscore");
const asociacionModel = require("./../models/asociacion");
const {
  verificaToken,
  verificaRoleMaster,
} = require("../middlewares/autenticacion");
const usuario = require("../models/usuario");
const app = express();

app.get("/asociacion", [verificaToken, verificaRoleMaster], (req, res) => {
  if (req.usuario.role == "SUPER_ROLE") {
    asociacionModel
      .find()
      .populate("id_soc")
      .exec((err, asociacionDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          asociacion: asociacionDB,
        });
      });
  } else if (req.usuario.role == "ADMIN_ROLE") {
    asociacionModel
      .findById(req.usuario.id_asociacion[0].id_asociacion)
      .populate("id_soc")
      .exec((err, asociacionDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          asociacion: asociacionDB,
        });
      });
  }
});

app.get("/asociacion/:id", [verificaToken, verificaRoleMaster], (req, res) => {
  let id = req.params.id;
  asociacionModel.findById(id, (err, asociacionDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      asociacion: asociacionDB,
    });
  });
});

app.post("/asociacion", [verificaToken, verificaRoleMaster], (req, res) => {
  let body = req.body;

  let dataAsociacion = new asociacionModel({
    nombre_aso: body.nombre_aso,
    certificado_aso: body.certificado_aso,
    sector_aso: body.sector_aso,
    barrio_aso: body.barrio_aso,
    parroquia_aso: body.parroquia_aso,
    id_soc: body.id_soc,
  });

  if (req.usuario.role == "SUPER_ROLE") {
    dataAsociacion.save((err, asociacionDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        asociacion: asociacionDB,
      });
    });
  } else if (req.usuario.role == "ADMIN_ROLE") {
    res.json({
      ok: true,
      asociacion: "Solo el super usuario puede crear asociaciones",
    });
  }
});

app.put("/asociacion/:id", [verificaToken, verificaRoleMaster], (req, res) => {
  let id;

  if (req.usuario.role == "SUPER_ROLE") {
    id = req.params.id;
    console.log("Super ");
  } else if (req.usuario.role == "ADMIN_ROLE") {
    if (req.params.id == req.usuario.id_asociacion[0].id_asociacion) {
      id = req.params.id;
    } else {
      res.json({
        ok: false,
        error: "No puede actualizar informacion de asociacion externa",
      });
    }
  }
  let body = _.pick(req.body, [
    "nombre_aso",
    "certificado_aso",
    "sector_aso",
    "barrio_aso",
    "parroquia_aso",
    "id_soc",
  ]);

  asociacionModel.findByIdAndUpdate(id, body, (err, asociacionDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      asociacion: asociacionDB,
      message: "Se actualizo la asociacion correctamente",
    });
  });
});

app.delete(
  "/asociacion/:id",
  [verificaToken, verificaRoleMaster],
  (req, res) => {
    if (req.usuario.role == "SUPER_ROLE") {
      if (req.params.id) {
        let id = req.params.id;

        asociacionModel.findByIdAndDelete(id, (err) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
          }
          res.json({
            ok: true,
            message: "Se elimino la asociacion correctamente",
          });
        });
      } else {
        res.status(400).json({
          ok: false,
          message: "Error al querer eliminar",
        });
      }
    } else {
      res.json({
        ok: false,
        error: "Solo el super usuario puede borrar asociaciones",
      });
    }
  }
);

module.exports = app;
