const express = require("express");
const _ = require("underscore");
const directivaModel = require("./../models/directiva");
const {
  verificaToken,
  verificaRoleMaster,
} = require("../middlewares/autenticacion");
const app = express();

app.get("/directiva", [verificaToken, verificaRoleMaster], (req, res) => {
  if (req.usuario.role == "SUPER_ROLE") {
    directivaModel
      .find()
      .populate("id_asoc")
      .exec((err, directivaDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          directiva: directivaDB,
        });
      });
  } else if (req.usuario.role == "ADMIN_ROLE") {
    directivaModel
      .find({ id_asoc: req.usuario.id_asociacion[0].id_asociacion })
      .populate("id_asoc")
      .exec((err, directivaDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          directiva: directivaDB,
        });
      });
  }
});

app.get("/directiva/:id", [verificaToken, verificaRoleMaster], (req, res) => {
  let id = req.params.id;
  directivaModel.findById(id, (err, directivaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      directiva: directivaDB,
    });
  });
});

app.post("/directiva", [verificaToken, verificaRoleMaster], (req, res) => {
  let body = req.body;

  let dataDirectiva = new directivaModel({
    cargo_dir: body.cargo_dir,
    nom_dir: body.nom_dir,
    ape_dir: body.ape_dir,
    periodo_dir: body.periodo_dir,
  });

  if (req.usuario.role == "SUPER_ROLE") {
    dataDirectiva["id_asoc"] = body.id_asoc;
  } else if (req.usuario.role == "ADMIN_ROLE") {
    dataDirectiva["id_asoc"] = req.usuario.id_asociacion[0].id_asociacion;
  }

  dataDirectiva.save((err, directivaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      directiva: directivaDB,
    });
  });
});

app.put("/directiva/:id", [verificaToken, verificaRoleMaster], (req, res) => {
  let id = req.params.id;
  //Revisar si validar todos los datos
  let body = _.pick(req.body, [
    "cargo_dir",
    "nom_dir",
    "ape_dir",
    "periodo_dir",
  ]);

  directivaModel.findByIdAndUpdate(id, body, (err, directivaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      directiva: directivaDB,
      message: "Se actualizo la directiva correctamente",
    });
  });
});

app.delete(
  "/directiva/:id",
  [verificaToken, verificaRoleMaster],
  (req, res) => {
    if (req.params.id) {
      let id = req.params.id;

      directivaModel.findByIdAndDelete(id, (err) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          message: "Se elimino la directiva correctamente",
        });
      });
    } else {
      res.status(400).json({
        ok: false,
        message: "Error al querer eliminar",
      });
    }
  }
);

module.exports = app;
