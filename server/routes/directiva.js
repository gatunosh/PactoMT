const express = require('express');
const _ = require("underscore");
const directivaModel = require("./../models/directiva");

const app = express();

app.get('/directiva', (req, res) => {
    directivaModel.find((err, directivaDB) => {
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

app.get("/directiva/:id", (req, res) => {
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

app.post('/directiva', (req, res) => {

    let body = req.body;

    let dataDirectiva = new directivaModel({
        cargo_dir: body.cargo,
        nom_dir: body.nombre,
        ape_dir: body.apellido,
        periodo_dir: body.periodo,      
    });

    dataDirectiva.save((err, directivaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            directiva: directivaDB
        });

    });


});

app.put('/directiva/:id', (req, res) => {

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

app.delete('/directiva/:id', (req, res) => {
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
});




module.exports = app;
