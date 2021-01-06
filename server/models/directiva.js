const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let directivaSchema = new Schema({
    cargo_dir: {
        type: String,
        unique: true,
        required: [true, 'El cargo es requerido']
    },
    nom_dir: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    ape_dir: {
        type: String,
        required: [true, 'El apellido es requerido']
    },
    periodo_dir: {
        type: String,
        required: [true, 'El periodo es requerido']
    }
});


module.exports = mongoose.model('Directiva', directivaSchema);
