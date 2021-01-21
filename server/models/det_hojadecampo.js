const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let det_hojacampoSchema = new Schema({
    dias_det: {
        type: String,
        unique: true,
        required: [true, 'El detalle de los dias es requerido']
    },
    des_det: {
        type: String,
        required: [true, 'La descripcion del detalle es requerido']
    },
    prepa_suelo: {
        type: String,
        required: [true, 'La preparacion del suelo es requerida']
    },
    prepa_semi: {
        type: String,
        required: [true, 'La preparacion de la semilla es requerida']
    },
    siembra: {
        type: String,
        required: [true, 'La siembra es requerida']
    },
    resiembra: {
        type: String,
        required: [true, 'La resiembra es requerida']
    },
    deshierbe: {
        type: String,
        required: [true, 'El deshierbe es requerido']
    },
    aporque: {
        type: String,
        required: [true, 'El aporque es requerido']
    },
    lim_deshoje: {
        type: String,
        required: [true, 'El limite de deshoje es requerido']
    },
    elabo_abosoli: {
        type: String,
        required: [true, 'La elaboracion del abosoli es requerido']
    },
    aplica_abono: {
        type: String,
        required: [true, 'La aplicacion del abono es requerido']
    },
    contro_plaga: {
        type: String,
        required: [true, 'El control de la plaga es requerido']
    },
    contro_enfer: {
        type: String,
        required: [true, 'El control de enfermedad es requerido']
    },
    mant_finca: {
        type: String,
        required: [true, 'El mantenimiento de la finca es requerido']
    },
    cosecha: {
        type: String,
        required: [true, 'La cosecha es requerido']
    },
    acarreo_transp: {
        type: String,
        required: [true, 'El acarreo del transporte es requerido']
    },
    descarga: {
        type: String,
        required: [true, 'La descarga es requerido']
    },
    calibra_mante: {
        type: String,
        required: [true, 'La calibracion del mantenimiento es requerido']
    },
    molienda: {
        type: String,
        required: [true, 'La molienda es requerido']
    },
    filtrado: {
        type: String,
        required: [true, 'El filtrado es requerido']
    },
    melada: {
        type: String,
        required: [true, 'La melada es requerido']
    },
    clarificada: {
        type: String,
        required: [true, 'La clarificada es requerido']
    },
    punteo: {
        type: String,
        required: [true, 'El punteo es requerido']
    },
    batido: {
        type: String,
        required: [true, 'El batido es requerido']
    },
    tamizado: {
        type: String,
        required: [true, 'El tamizado es requerido']
    },
    empacado: {
        type: String,
        required: [true, 'El empacado es requerido']
    },
    codificado: {
        type: String,
        required: [true, 'El codificado es requerido']
    },
    lim_modulo: {
        type: String,
        required: [true, 'El limite del modulo es requerido']
    },
    desinf_modulo: {
        type: String,
        required: [true, 'La desinfeccion del modulo es requerido']
    },
    regis_venta: {
        type: String,
        required: [true, 'El registro de la venta es requerido']
    },
    llenado_conta: {
        type: String,
        required: [true, 'El llenado de la contabilidad es requerido']
    },
    capacitacion: {
        type: String,
        required: [true, 'La capacitacion es requerido']
    },
    comercializacion: {
        type: String,
        required: [true, 'La comercializacion es requerido']
    },
    subjornal: {
        type: String,
        required: [true, 'El subjornal es requerido']
    },
    costojornal: {
        type: String,
        required: [true, 'El costo de la jornada es requerido']
    },
    costomanoobra: {
        type: String,
        required: [true, 'El costo de la mano de obra es requerido']
    },
    manoobrafam: {
        type: String,
        required: [true, 'La mano de obra familiar es requerido']
    },
    totmanoobra: {
        type: String,
        required: [true, 'El total de la mano de obra es requerido']
    },
    combustible: {
        type: String,
        required: [true, 'El combustible es requerido']
    },
    transporte: {
        type: String,
        required: [true, 'El transporte es requerido']
    },
    mantenimiento: {
        type: String,
        required: [true, 'El mantenimiento es requerido']
    },
    cana: {
        type: String,
        required: [true, 'La cana es requerida']
    },
    totallaborescult: {
        type: String,
        required: [true, 'El total de las labores del cultivo es requerido']
    },
    trapicheyhorno: {
        type: String,
        required: [true, 'El trapiche y el horno es requerido']
    },
    tinasyutencillos: {
        type: String,
        required: [true, 'Las tinas y los utencillos es requerido']
    },
    infraestructura: {
        type: String,
        required: [true, 'La infraestructura es requerido']
    },
    totalequiposymaquinaria: {
        type: String,
        required: [true, 'El total de los equipos y la maquinaria es requerido']
    }
});


module.exports = mongoose.model('det_hojacampo', det_hojacampoSchema);
