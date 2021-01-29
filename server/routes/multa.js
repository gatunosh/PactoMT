const express = require('express');
const _ = require("underscore");
const multaModel = require("./../models/multa");

const app = express();

app.get('/multa', (req, res) => {
    multaModel.find((err, multaDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          multa: multaDB,
        });
      });
});

app.get("/multa/:id", (req, res) => {
    let id = req.params.id;
    multaModel.findById(id, (err, multaDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        multa: multaDB,
      });
    });
  });

app.post('/multa', (req, res) => {

    let body = req.body;

    let dataMulta = new multaModel({
        id_soc: body.id_soc,
        multa: body.multa,
        id_reu: body.id_reu,     
    });

    dataMulta.save((err, multaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            multa: multaDB
        });

    });


});

app.put('/multa/:id', (req, res) => {

        let id = req.params.id;
        //Revisar si validar todos los datos
        let body = _.pick(req.body, [
          "id_soc",
          "multa",
          "id_reu",
        ]);
    
        multaModel.findByIdAndUpdate(id, body, (err, multaDB) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
          }
          res.json({
            ok: true,
            multa: multaDB,
            message: "Se actualizo la multa correctamente",
          });
        });
});

app.delete('/multa/:id', (req, res) => {
    if (req.params.id) {
        let id = req.params.id;
    
        multaModel.findByIdAndDelete(id, (err) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
          }
          res.json({
            ok: true,
            message: "Se elimino la multa correctamente",
          });
        });
      } else {
        res.status(400).json({
          ok: false,
          message: "Error al querer eliminar la multa",
        });
      }
});




module.exports = app;
