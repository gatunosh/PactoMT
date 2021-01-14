const express = require("express");
const _ = require("underscore");

const productoModel = require("./../models/producto");

const app = express();

app.get("/producto", (req, res) => {
  productoModel.find((err, productoDB) => {
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

app.get("/producto/:id", (req, res) => {
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

app.post("/producto", (req, res) => {
  let body = req.body;

  let dataProducto = new productoModel({
    id_cat: body.categoria,
    nom_pro: body.nombre,
    desc_pro: body.descripcion,
    uni_pro: body.unidad,
    sto_pro: body.stock,
    pvp_pro: body.pvp,
    fecha_ela_pro: body.fecha_elaboracion,
    fecha_cad_pro: body.fecha_caducidad,
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

app.put("/producto/:id", (req, res) => {
  let id = req.params.id;
  //Revisar si validar todos los datos
  let body = _.pick(req.body, [
    "id_cat",
    "nom_pro",
    "desc_pro",
    "uni_pro",
    "sto_pro",
    "pvp_pro",
    "fecha_ela_pro",
    "fecha_cad_pro",
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

app.delete("/producto/:id", (req, res) => {
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
