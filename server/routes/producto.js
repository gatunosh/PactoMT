const express = require("express");
const _ = require("underscore");

const productoModel = require("./../models/producto");
const {
  verificaToken,
  verificaRoleMaster,
} = require("../middlewares/autenticacion");
const app = express();

app.get("/producto", verificaToken, (req, res) => {
  productoModel
    .find()
    .populate("id_cat")
    .populate("aso_ps")
    .exec((err, productoDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        producto: productoDB,
      });
    });
});

app.get("/producto/:id", verificaToken, (req, res) => {
  let id = req.params.id;
  productoModel.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      producto: productoDB,
    });
  });
});

app.post("/producto", [verificaToken, verificaRoleMaster], (req, res) => {
  let body = req.body;

  let dataProducto = new productoModel({
    id_cat: body.id_cat,
    nom_pro: body.nom_pro,
    desc_pro: body.desc_pro,
    uni_pro: body.uni_pro,
    sto_pro: body.sto_pro,
    pvp_pro: body.pvp_pro,
  });
  if (req.usuario.role == "SUPER_ROLE") {
    dataProducto["aso_ps"] = body.aso_ps;
  } else if (req.usuario.role == "ADMIN_ROLE") {
    dataProducto["aso_ps"] = req.usuario.id_asociacion[0].id_asociacion;
  }

  dataProducto.save((err, productoDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Error al crear el producto",
        err,
      });
    }
    res.status(200).json({
      ok: true,
      producto: productoDB,
      message: "Producto creada correctamente",
    });
  });
});

app.put("/producto/:id", [verificaToken, verificaRoleMaster], (req, res) => {
  let id = req.params.id;
  //Revisar si validar todos los datos
  let body = _.pick(req.body, [
    "id_cat",
    "aso_ps",
    "nom_pro",
    "desc_pro",
    "uni_pro",
    "sto_pro",
    "pvp_pro",
  ]);

  if (req.usuario.role == "SUPER_ROLE") {
    body["aso_ps"] = req.body.aso_ps;
  } else if (req.usuario.role == "ADMIN_ROLE") {
    body["aso_ps"] = req.usuario.id_asociacion[0].id_asociacion;
  }

  productoModel.findByIdAndUpdate(id, body, (err, productoDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      producto: productoDB,
      message: "Se actualizo el producto correctamente",
    });
  });
});

app.delete("/producto/:id", [verificaToken, verificaRoleMaster], (req, res) => {
  let id = req.params.id;

  productoModel.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      message: "Se elimino el producto correctamente",
    });
  });
});

module.exports = app;
