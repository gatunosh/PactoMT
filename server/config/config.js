// ======================
// Puerto
// ======================

process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// Vencimiento del token
// ======================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ======================
// SEED de autenticación
// ======================

process.env.SEED = process.env.SEED || 'seed-desarrollo';

// ======================
// Base de datos
// ======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/pacto';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;