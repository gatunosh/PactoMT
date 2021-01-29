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
        dias_det: body.dias_det,
        des_det: body.des_det,        
        prepa_suelo: body.prepa_suelo,
        prepa_semi: body.prepa_semi,
        siembra: body.siembra,
        resiembra: body.resiembra,
        deshierbe: body.deshierbe,
        aporque: body.aporque,
        lim_deshoje: body.lim_deshoje,
        elabo_abosoli: body.elabo_abosoli,
        aplica_abono: body.aplica_abono,
        contro_plaga: body.contro_plaga,
        contro_enfer: body.contro_enfer,
        mant_finca: body.mant_finca,
        cosecha: body.cosecha,
        acarreo_transp: body.acarreo_transp,
        descarga: body.descarga,
        calibra_mante: body.calibra_mante,
        molienda: body.molienda,
        filtrado: body.filtrado,
        melada: body.melada,
        clarificada: body.clarificada,
        punteo: body.punteo,
        batido: body.batido,
        tamizado: body.tamizado,
        empacado: body.empacado,
        codificado: body.codificado,
        lim_modulo: body.lim_modulo,
        desinf_modulo: body.desinf_modulo,
        regis_venta: body.regis_venta,
        llenado_conta: body.llenado_conta,
        capacitacion: body.capacitacion,
        comercializacion: body.comercializacion,
        subjornal: body.subjornal,
        costojornal: body.costojornal,
        costomanoobra: body.costomanoobra,
        manoobrafam: body.manoobrafam,
        totmanoobra: body.totmanoobra,
        combustible: body.combustible,
        transporte: body.transporte,
        mantenimiento: body.mantenimiento,
        cana: body.cana,
        totallaborescult: body.totallaborescult,
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
