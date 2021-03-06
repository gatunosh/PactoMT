const express = require('express');
const _ = require("underscore");
const multaModel = require("./../models/multa");
const {
    verificaToken,
} = require("../middlewares/autenticacion");
const app = express();

app.get('/multa', verificaToken, (req, res) => {
    multaModel.find({})
        .populate('id_soc')
        .populate('id_reu')
        .exec((err, multaDB) => {
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

app.get("/multa/:id", verificaToken, (req, res) => {
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

app.post('/multa', verificaToken, (req, res) => {

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

app.put('/multa/:id', verificaToken, (req, res) => {

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

app.delete('/multa/:id', verificaToken, (req, res) => {
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