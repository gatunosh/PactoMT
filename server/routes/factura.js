const express = require("express");
const app = express();
const _ = require("underscore");

const {
    verificaToken,
} = require("../middlewares/autenticacion");

const facturaModel = require("./../models/factura");

app.get("/factura", verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 15;
    limite = Number(limite);

    facturaModel
        .find()
        .skip(desde)
        .limit(limite)
        .exec((err, facturaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                factura: facturaDB,
            });
        });
});

app.get("/factura/:id", verificaToken, (req, res) => {
    let id = req.params.id;
    facturaModel.findById(id, (err, facturaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            factura: facturaDB,
        });
    });
});

app.post("/factura", verificaToken, (req, res) => {
    let body = req.body;

    let dataFactura = new facturaModel({
        id_cli: body.id_cli,
        fec_fac: body.fec_fac,
        tot_fac: body.tot_fac,
        detalle: body.detalle,
    });

    dataFactura.save((err, facturaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Error al crear la factura",
                err,
            });
        }
        res.json({
            ok: true,
            factura: facturaDB,
            message: "Factura creada correctamente",
        });
    });
});

app.put("/factura/:id", verificaToken, (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, ["id_cli", "fec_fac", , "tot_fac", "detalle"]);

    facturaModel.findByIdAndUpdate(id, body, (err, facturaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            factura: facturaDB,
            message: "Se actualizo la factura correctamente",
        });
    });
});

app.delete("/factura/:id", verificaToken, (req, res) => {
    let id = req.params.id;

    facturaModel.findByIdAndDelete(id, (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            message: "Se ha borrado la factura ",
        });
    });
});

module.exports = app;