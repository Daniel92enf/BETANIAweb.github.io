const express = require('express');
const session = require('express-session');
const path = require('path');
const responseHandler = require('./middlewares/responseHandler');

const app = express();
const PORT = process.env.PORT || 3000;


// Configuración de express-session
app.use(session({
    secret: 'HGKJHG658iJHBA(&/%987gaigfttda98764%GKLHGB9685tkjjhabdlk)&(%)(&YGFLKga798d6rtfoigbo7atd98TOIUGUe4857659rtagdoiR%%$', // Cambia esto por una clave secreta
    resave: false, // No volver a guardar la sesión si no ha cambiado
    saveUninitialized: true, // Guarda una sesión nueva sin inicializar
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(responseHandler);

// Rutas
const router = require('./routes/index');
app.use('/', router);


// Iniciar el servidor si no es un entorno de pruebas
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;
