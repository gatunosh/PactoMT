const express = require('express');
const _ = require("underscore");
const maquinariasocioModel = require("./../models/maquinariasocio");

const app = express();

app.get('/maquinariasocio', (req, res) => {
    maquinariasocioModel.find((err, maquinariasocioDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          maquinariasocio: maquinariasocioDB,
        });
      });
});

app.get("/maquinariasocio/:id", (req, res) => {
    let id = req.params.id;
    maquinariasocioModel.findById(id, (err, maquinariasocioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        maquinariasocio: maquinariasocioDB,
      });
    });
  });

app.post('/maquinariasocio', (req, res) => {

    let body = req.body;

    let dataMaquinariasocio = new maquinariasocioModel({
        tipo_maq: body.tipo,
        est_maq: body.estado,
        asociacion_maq: body.asociacionmaq,
   
    });

    dataMaquinariasocio.save((err, maquinariasocioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            maquinariasocio: maquinariasocioDB
        });

    });

});

app.put('/maquinariasocio/:id', (req, res) => {

    let id = req.params.id;
    
    let body = _.pick(req.body, [
      "tipo_maq",
      "est_maq",
      "asociacion_maq",

    ]);

    maquinariasocioModel.findByIdAndUpdate(id, body, (err, maquinariasocioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        maquinariasocio: maquinariasocioDB,
        message: "Se actualizo la maquinaria de socios correctamente",
      });
    });
});

app.delete('/maquinariasocio/:id', (req, res) => {
    if (req.params.id) {
        let id = req.params.id;
    
        maquinariasocioModel.findByIdAndDelete(id, (err) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
          }
          res.json({
            ok: true,
            message: "Se elimino la maquinaria de socios correctamente",
          });
        });
      } else {
        res.status(400).json({
          ok: false,
          message: "Error al tratar de eliminar",
        });
      }
});

module.exports = app;