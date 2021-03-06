const express = require("express");
const _ = require("underscore");
const mantenimientomaqsocioModel = require("./../models/mantenimientomaqsocio");
const {
    verificaToken,
    verificaRoleMaster
} = require("../middlewares/autenticacion");
const app = express();

app.get("/mantenimientomaqsocio", [verificaToken, verificaRoleMaster], (req, res) => {
    mantenimientomaqsocioModel.find()
        .populate('id_maq_soc.id_maq_soc')
        .exec((err, mantenimientomaqsocioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                mantenimientomaqsocio: mantenimientomaqsocioDB,
            });
        });
});

app.get("/mantenimientomaqsocio/:id", verificaToken, (req, res) => {
    let id = req.params.id;
    mantenimientomaqsocioModel.findById(id, (err, mantenimientomaqsocioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            mantenimientomaqsocio: mantenimientomaqsocioDB,
        });
    });
});

app.post("/mantenimientomaqsocio", [verificaToken, verificaRoleMaster], (req, res) => {
    let body = req.body;

    let dataMantenimientomaqsocio = new mantenimientomaqsocioModel({
        id_maq_soc: body.id_maq_soc,
        fech_man_maq: body.fech_man_maq,
        tipo_man_maq: body.tipo_man_maq,
        des_man_maq: body.des_man_maq,
        costo_man_maq: body.costo_man_maq,
        proximo_man_maq: body.proximo_man_maq,
    });

    dataMantenimientomaqsocio.save((err, mantenimientomaqsocioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            mantenimientomaqsocio: mantenimientomaqsocioDB,
        });
    });
});

app.put("/mantenimientomaqsocio/:id", [verificaToken, verificaRoleMaster], (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, [
        "id_maq_soc",
        "fech_man_maq",
        "tipo_man_maq",
        "des_man_maq",
        "costo_man_maq",
        "proximo_man_maq",
    ]);
    mantenimientomaqsocioModel.findByIdAndUpdate(
        id,
        body,
        (err, mantenimientomaqsocioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                mantenimientomaqsocio: mantenimientomaqsocioDB,
                message: "Se actualizo los mantenimientos de maquinaria correctamente",
            });
        }
    );
});

app.delete("/mantenimientomaqsocio/:id", [verificaToken, verificaRoleMaster], (req, res) => {
    if (req.params.id) {
        let id = req.params.id;

        mantenimientomaqsocioModel.findByIdAndDelete(id, (err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                message: "Se elimino el mantenimiento de la maquinaria correctamente",
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