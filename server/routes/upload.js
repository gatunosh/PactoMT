const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../models/usuario');
const Asociacion = require('../models/asociacion');

const fs = require('fs');
const path = require('path');
const { verificaToken, verificaRoleMaster } = require('../middlewares/autenticacion');

app.use(fileUpload({ useTempFiles: true }));


app.put('/upload/:tipo/:id', [verificaToken, verificaRoleMaster], (req, res) => {

    let tipo = req.params.tipo;
    let id = req.params.id;


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400)
            .json({
                ok: false,
                err: {
                    message: 'No se ha selecionado ningun archivo'
                }
            });
    }

    //Validar tipo
    let tiposValidos = ['productos', 'usuarios', 'asociacion'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + tiposValidos.join(', '),
                tipo
            }
        });
    }

    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    //Extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'pdf', 'doc'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'La extensiones permitidas son ' + extensionesValidas.join(', '),
                ext: extension
            }
        });
    }






    //Cambiar nombre al archivo
    let nombreArchivo = `${id}-${ new Date().getMilliseconds()}.${extension}`;

    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });

        //La imagen se cargo

        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else if (tipo === 'asociacion') {
            imagenAsociacion(id, res, nombreArchivo);
        }


    });

});


imagenUsuario = (id, res, nombreArchivo) => {

    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        borraArchivo(usuarioDB.img, 'usuarios');


        usuarioDB.img = nombreArchivo;

        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        });


    });
}

imagenAsociacion = (id, res, nombreArchivo) => {

    Asociacion.findById(id, (err, asociacionDB) => {
        if (err) {
            borraArchivo(nombreArchivo, 'asociacion');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!asociacionDB) {
            borraArchivo(nombreArchivo, 'asociacion');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'La asociación no existe'
                }
            });
        }

        borraArchivo(asociacionDB.logo_aso, 'asociacion');


        asociacionDB.logo_aso = nombreArchivo;

        asociacionDB.save((err, asociacionGuardado) => {
            res.json({
                ok: true,
                asociacion: asociacionGuardado,
                logo_aso: nombreArchivo
            })
        });


    });
}


borraArchivo = (nombreImagen, tipo) => {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}


module.exports = app;