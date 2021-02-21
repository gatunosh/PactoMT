const express = require("express");
const _ = require("underscore");
const asociacionModel = require("./../models/asociacion");
const {
    verificaToken
} = require("../middlewares/autenticacion");
const app = express();

app.get("/asociacion", (req, res) => {
    asociacionModel.find()
        .populate('id_soc')
        .exec((err, asociacionDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                asociacion: asociacionDB,
            });
        });
});

app.get("/asociacion/:id", (req, res) => {
    let id = req.params.id;
    asociacionModel.findById(id, (err, asociacionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            asociacion: asociacionDB,
        });
    });
});

app.post("/asociacion", (req, res) => {
    let body = req.body;

    let dataAsociacion = new asociacionModel({
        nombre_aso: body.nombre_aso,
        certificado_aso: body.certificado_aso,
        sector_aso: body.sector_aso,
        barrio_aso: body.barrio_aso,
        parroquia_aso: body.parroquia_aso,
        id_soc: body.id_soc,
    });

    dataAsociacion.save((err, asociacionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            asociacion: asociacionDB,
        });
    });
});

app.put("/asociacion/:id", (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, [
        "nombre_aso",
        "certificado_aso",
        "sector_aso",
        "barrio_aso",
        "parroquia_aso",
        "id_soc",
    ]);

    asociacionModel.findByIdAndUpdate(id, body, (err, asociacionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            asociacion: asociacionDB,
            message: "Se actualizo la asociacion correctamente",
        });
    });
});

app.delete("/asociacion/:id", (req, res) => {
    if (req.params.id) {
        let id = req.params.id;

        asociacionModel.findByIdAndDelete(id, (err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                message: "Se elimino la asociacion correctamente",
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