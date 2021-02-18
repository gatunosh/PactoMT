const express = require("express");
const _ = require("underscore");

const productoModel = require("./../models/producto");
const { verificaToken } = require("../middlewares/autenticacion");
const app = express();

app.get("/producto", verificaToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 15;
  limite = Number(limite);

  productoModel
    .find()
    .populate("id_cat")
    .populate("aso_ps")
    .skip(desde)
    .limit(limite)
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

app.post("/producto", verificaToken, (req, res) => {
  let body = req.body;

  let dataProducto = new productoModel({
    id_cat: body.id_cat,
    aso_ps: body.aso_ps,
    nom_pro: body.nom_pro,
    desc_pro: body.desc_pro,
    uni_pro: body.uni_pro,
    sto_pro: body.sto_pro,
    pvp_pro: body.pvp_pro,
  });

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

app.put("/producto/:id", verificaToken, (req, res) => {
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

app.delete("/producto/:id", verificaToken, (req, res) => {
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
