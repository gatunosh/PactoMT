// ======================
// Puerto
// ======================

process.env.PORT = process.env.PORT || 3000;

// ======================
// Entorno
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================
// Base de datos
// ======================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/pacto';
} else {
    urlDB = 'mongodb+srv://gatunosh:SuALUSrUhLHuPMGi@pactoserver.mqhkk.mongodb.net/Pacto';
}

process.env.URLDB = urlDB;