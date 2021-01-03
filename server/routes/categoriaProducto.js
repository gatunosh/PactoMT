const express = require("express");
const _ = require("underscore");

const categoriaProductoModel = require("./../models/categoriaProducto");

const app = express();

app.get("/categoria", (req, res) => {
    if (req.query.id) {
        let id = req.query.id;
        if (id) {
            categoriaProductoModel.findById(id, (err, categoriaDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    });
                }
                res.json({
                    ok: true,
                    categoria: categoriaDB,
                });
            });
        }
    } else {
        categoriaProductoModel.find((err, categoriaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                categoria: categoriaDB,
            });
        });
    }
});

app.post("/categoria", (req, res) => {
    let body = req.body;

    let dataCategoria = new categoriaProductoModel({
        nombre: body.nombre,
        descripcion: body.descripcion,
    });

    dataCategoria.save((err, categoriaDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: "Error al crear la categoria",
                error: err,
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB,
            message: "Categoria creada correctamente",
        });
    });
});

app.put("/categoria/:id", (req, res) => {
    if (req.params.id) {
        let id = req.params.id;
        if (req.body.nombre && req.body.descripcion) {
            let body = _.pick(req.body, ["nombre", "descripcion"]);

            categoriaProductoModel.findByIdAndUpdate(id, body, { new: true }, (err, categoriaDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    categoria: categoriaDB,
                    message: "Se actualizo la categoria correctamente",
                });
            });
        } else {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "No hay datos para actualizar",
                }
            });
        }
    } else {
        res.status(400).json({
            ok: false,
            err: {
                message: "Error al querer actualizar",
            }
        });
    }
});

app.delete("/categoria/:id", (req, res) => {
    if (req.params.id) {
        let id = req.params.id;

        categoriaProductoModel.findByIdAndDelete(id, (err) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                message: "Se elemino la categoria correctamente",
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