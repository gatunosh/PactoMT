const express = require("express");

const bcrypt = require("bcrypt");
const _ = require("underscore");

const Usuario = require("../models/usuario");
const {
  verificaToken,
  verificaAdmin_Role,
} = require("../middlewares/autenticacion");

const app = express();

app.get("/usuario", [verificaToken, verificaAdmin_Role], (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  Usuario.find({ estado: true }, "nombre apellido tlfc tlfm email role estado")
    .sort("email")
    .populate("id_asociacion.id_asociacion")
    .skip(desde)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      Usuario.count({ estado: true }, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          total: conteo,
        });
      });
    });
});

app.get("/usuario/:correo", (req, res) => {
  let correo = req.params.correo;

  Usuario.findOne({ email: correo }, (err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

app.post("/usuario", [verificaToken, verificaAdmin_Role], (req, res) => {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    apellido: body.apellido,
    tlfc: body.tlfc,
    tlfm: body.tlfm,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
    id_asociacion: body.id_asociacion,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

app.put("/usuario/:id", [verificaToken], (req, res) => {
  let id = req.params.id;

  let body = _.pick(req.body, [
    "nombre",
    "apellido",
    "tlfc",
    "email",
    "tlfm",
    "hectareas",
    "sector",
    "barrio",
    "parroquia",
    "estado",
    "role",
    "id_asociacion",
  ]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB,
      });
    }
  );
});

app.delete("/usuario/:id", [verificaToken, verificaAdmin_Role], (req, res) => {
  let id = req.params.id;

  Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true },
    (err, usuarioBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      if (!usuarioBorrado) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "El usuario no fue encontrado",
          },
        });
      }

      res.json({
        ok: true,
        usuario: usuarioBorrado,
      });
    }
  );
});

module.exports = app;
