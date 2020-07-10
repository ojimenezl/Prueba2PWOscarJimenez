// =============================================
// Puerto
// =============================================

process.env.PORT = process.env.PORT || 3000;

// =============================================
// Entorno
// =============================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============================================
// Base de datos
// =============================================

let urlDB;

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
//     urlDB = 'mongodb+srv://Oscar:J576Omly@cluster0.eo1d7.mongodb.net/cafe?retryWrites=true&w=majority'
// }
urlDB = 'mongodb://localhost:27017/prueba'

process.env.URLDB = urlDB;