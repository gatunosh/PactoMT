const express = require("express");
const _ = require("underscore");
const maquinariasocioModel = require("./../models/maquinariasocio");
const {
    verificaToken,
    verificaRoleMaster
} = require("../middlewares/autenticacion");
const app = express();

app.get("/maquinariasocio", [verificaToken, verificaRoleMaster], (req, res) => {
    maquinariasocioModel.find({})
        .populate('id_soc.id_soc')
        .exec((err, maquinariasocioDB) => {
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

app.get("/maquinariasocio/:id", [verificaToken, verificaRoleMaster], (req, res) => {
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

app.post("/maquinariasocio", [verificaToken, verificaRoleMaster], (req, res) => {
    let body = req.body;

    let dataMaquinariasocio = new maquinariasocioModel({
        id_soc: body.id_soc,
        nom_maq: body.nom_maq,
        tipo_maq: body.tipo_maq,
        est_maq: body.est_maq,
        asociacion_maq: body.asociacion_maq,
        marca_man_maq: body.marca_man_maq,
        km_man_maq: body.km_man_maq,
        placa_man_maq: body.placa_man_maq,
        origen_man_maq: body.origen_man_maq,
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

app.put("/maquinariasocio/:id", [verificaToken, verificaRoleMaster], (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, [
        "id_soc",
        "nom_maq",
        "tipo_maq",
        "est_maq",
        "asociacion_maq",
        "marca_man_maq",
        "km_man_maq",
        "placa_man_maq",
        "origen_man_maq",
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

app.delete("/maquinariasocio/:id", [verificaToken, verificaRoleMaster], (req, res) => {
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
