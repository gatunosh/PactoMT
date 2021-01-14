const express = require("express");
const _ = require("underscore");

const categoriaProductoModel = require("./../models/categoriaProducto");

const app = express();

app.get("/categoria", (req, res) => {
  categoriaProductoModel.find((err, categoriaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      categoria: categoriaDB,
    });
  });
});

app.get("/categoria/:id", (req, res) => {
  let id = req.params.id;
  categoriaProductoModel.findById(id, (err, categoriaDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      categoria: categoriaDB,
    });
  });
});

app.post("/categoria", (req, res) => {
  let body = req.body;

  let dataCategoria = new categoriaProductoModel({
    nombre: body.nombre,
    descripcion: body.descripcion,
  });

  dataCategoria.save((err, categoriaDB) => {
    if (err) {
      res.status(400).json({
        ok: false,
        message: "Error al crear la categoria",
        error: err,
      });
    }
    res.json({
      ok: true,
      categoria: categoriaDB,
      message: "Categoria creada correctamente",
    });
  });
});

app.put("/categoria/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "descripcion"]);

  categoriaProductoModel.findByIdAndUpdate(
    id,
    body,
    { new: true },
    (err, categoriaDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        categoria: categoriaDB,
        message: "Se actualizo la categoria correctamente",
      });
    }
  );
});

app.delete("/categoria/:id", (req, res) => {
  let id = req.params.id;

  categoriaProductoModel.findByIdAndDelete(id, (err) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      message: "Se elimino la categoria correctamente",
    });
  });
});

module.exports = app;
