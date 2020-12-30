const express = require('express');

const app = express();

app.get('/directiva', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);


    Directiva.find({ estado: true }, 'id cargo nombre apellido periodo')
        .skip(desde)
        .limit(limite)
        .exec((err, directiva) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Directiva.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    directiva,
                    total: conteo
                });

            });
        });
    });

app.post('/directiva', (req, res) => {

    let body = req.body;

    let directiva = new Directiva({
        id_dir: body.id_dir,
        cargo_dir: body.cargo_dir,
        nom_dir: body.nom_dir,
        ape_dir: body.ape_dir,
        periodo_dir: body.periodo_dir,
    });

    directiva.save((err, directivaDB) => {
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

    let body = _.pick(req.body, [ 'id', 'cargo', 'nombre', 'apellido', 'periodo']);

    directiva.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, directivaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            directiva: directivaDB
        })
    });

});

app.delete('/directiva/:id', (req, res) => {

    let id = req.params.id;

    Directiva.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, directivaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!directivaBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La directiva no fue encontrada'
                }
            });
        }

        res.json({
            ok: true,
            directiva: directivaBorrado
        });
    });
});




module.exports = app;
