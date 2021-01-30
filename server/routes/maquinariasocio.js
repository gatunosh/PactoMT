const express = require("express");
const _ = require("underscore");
const maquinariasocioModel = require("./../models/maquinariasocio");
const {
    verificaToken,
} = require("../middlewares/autenticacion");
const app = express();

app.get("/maquinariasocio", verificaToken, (req, res) => {
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

app.get("/maquinariasocio/:id", verificaToken, (req, res) => {
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

app.post("/maquinariasocio", verificaToken, (req, res) => {
    let body = req.body;

    let dataMaquinariasocio = new maquinariasocioModel({
        id_mant: body.id_mant,
        id_soc: body.id_soc,
        tipo_maq: body.tipo_maq,
        est_maq: body.est_maq,
        asociacion_maq: body.asociacion_maq,
    });

    dataMaquinariasocio.save((err, maquinariasocioDB) => {
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

app.put("/maquinariasocio/:id", verificaToken, (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, [
        "id_mant",
        "id_soc",
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

app.delete("/maquinariasocio/:id", verificaToken, (req, res) => {
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