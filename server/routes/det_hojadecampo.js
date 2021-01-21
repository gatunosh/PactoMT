const express = require('express');
const _ = require("underscore");
const det_hojacampoModel = require("./../models/det_hojadecampo");

const app = express();

app.get('/det_hojadecampo', (req, res) => {
    det_hojacampoModel.find((err, det_hojadecampoDB) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
          det_hojadecampo: det_hojadecampoDB,
        });
      });
});

app.get("/det_hojadecampo/:id", (req, res) => {
    let id = req.params.id;
    det_hojacampoModel.findById(id, (err, det_hojadecampoDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        det_hojadecampo: det_hojadecampoDB,
      });
    });
  });

app.post('/det_hojadecampo', (req, res) => {

    let body = req.body;

    let dataDet_hojacampo = new det_hojacampoModel({
        dias_det: body.diasdetalle,
        des_det: body.descripciondetalle,        
        prepa_suelo: body.preparacionsuelo,
        prepa_semi: body.preparacionsemilla,
        siembra: body.siembra,
        resiembra: body.resiembra,
        deshierbe: body.deshierbe,
        aporque: body.aporque,
        lim_deshoje: body.limitedeshoje,
        elabo_abosoli: body.elaboracionabosoli,
        aplica_abono: body.aplicaabono,
        contro_plaga: body.controlplaga,
        contro_enfer: body.controlenfermedad,
        mant_finca: body.mantenimientofinca,
        cosecha: body.cosecha,
        acarreo_transp: body.acarreotrasporte,
        descarga: body.descarga,
        calibra_mante: body.calibracionmantenimiento,
        molienda: body.molienda,
        filtrado: body.filtrado,
        melada: body.melada,
        clarificada: body.clarificada,
        punteo: body.punteo,
        batido: body.batido,
        tamizado: body.tamizado,
        empacado: body.empacado,
        codificado: body.codificado,
        lim_modulo: body.limitemodulo,
        desinf_modulo: body.desinfeccionmodulo,
        regis_venta: body.registroventa,
        llenado_conta: body.llenadoconta,
        capacitacion: body.capacitacion,
        comercializacion: body.comercializacion,
        subjornal: body.subjornal,
        costojornal: body.costojornal,
        costomanoobra: body.costomanoobra,
        manoobrafam: body.manoobrafamilia,
        totmanoobra: body.totalmanoobra,
        combustible: body.combustible,
        transporte: body.transporte,
        mantenimiento: body.mantenimiento,
        cana: body.cana,
        totallaborescult: body.totallaborescultivo,
        trapicheyhorno: body.trapicheyhorno,
        tinasyutencillos: body.tinasyutencillos,
        infraestructura: body.infraestructura,
        totalequiposymaquinaria: body.totalequiposymaquinaria,
    });

    dataDet_hojacampo.save((err, det_hojacampoModel) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            det_hojadecampo: det_hojadecampoDB
        });

    });


});

app.put('/det_hojadecampo/:id', (req, res) => {

        let id = req.params.id;
        //Revisar si validar todos los datos
        let body = _.pick(req.body, [
            "dias_det",
            "des_det",        
            "prepa_suelo",
            "prepa_semi",
            "siembra",
            "resiembra",
            "deshierbe",
            "aporque",
            "lim_deshoje",
            "elabo_abosoli",
            "aplica_abono",
            "contro_plaga",
            "contro_enfer",
            "mant_finca",
            "cosecha",
            "acarreo_transp",
            "descarga",
            "calibra_mante",
            "molienda",
            "filtrado",
            "melada",
            "clarificada",
            "punteo",
            "batido",
            "tamizado",
            "empacado",
            "codificado",
            "lim_modulo",
            "desinf_modulo",
            "regis_venta",
            "llenado_conta",
            "capacitacion",
            "comercializacion",
            "subjornal",
            "costojornal",
            "costomanoobra",
            "manoobrafam",
            "totmanoobra",
            "combustible",
            "transporte",
            "mantenimiento",
            "cana",
            "totallaborescult",
            "trapicheyhorno",
            "tinasyutencillos",
            "infraestructura",
           "totalequiposymaquinaria",
        ]);
    
        det_hojacampoModel.findByIdAndUpdate(id, body, (err, det_hojadecampoDB) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
          }
          res.json({
            ok: true,
            det_hojadecampo: det_hojadecampoDB,
            message: "Se actualizo el detalle de la hoja de campo correctamente",
          });
        });
});

app.delete('/det_hojadecampo/:id', (req, res) => {
    if (req.params.id) {
        let id = req.params.id;
    
        det_hojacampoModel.findByIdAndDelete(id, (err) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              err,
            });
          }
          res.json({
            ok: true,
            message: "Se elimino el detalle de la hoja de campo correctamente",
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
