const express = require('express');

const app = express();

app.get('/asociacion', (req, res) => {
    res.json({
        ok: true,
        message: 'Asociacion'
    });
});
const express = require('express');

const app = express();

app.get('/asociacion', (req, res) => {
    res.json({
        ok: true,
        message: 'Asociacion'
    });

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    Asociacion.find({ estado: true }, 'ID Nom_aso')
        .skip(desde)
        .limit(limite)
        .exec((err, asociacion) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Asociacion.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    asociacion,
                    total: conteo
                });

            });
        });

});

app.post('/asociacion', (req, res) => {

    let body = req.body;

    let asociacion = new Asociacion({
        ID_aso: body.ID_aso,
        nom_aso: body.nom_aso,
        cert_aso: body.cert_aso,
        sector_aso: body.sector_aso,
        barrio_aso: body.barrio_aso,
        parro_aso: body.parro_aso
    });

    asociacion.save((err, asociacionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            asociacion: asociacionDB
        });

    });

});

app.put('/asociacion/:id', (req, res) => {

    let id = req.params.id;

    let body = _.pick(req.body, ['ID', 'nombre','certificado', 'sector', 'barrio', 'parroquia']);

    asociacion.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, asociacionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            asociacion: asociacionDB
        })
    });

});

app.delete('/asociacion/:id', (req, res) => {

    let id = req.params.id;

    asociacion.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, asociacionBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!asociacionBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La asociacion no fue encontrada'
                }
            });
        }

        res.json({
            ok: true,
            asociacion: asociacionBorrado
        });
    });
});

module.exports = app;


module.exports = app;
