require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
// const hb = require('handelbars')

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// incluir rutas de /usuario
app.use(require('./routes/usuario'));
app.use(require('./routes/tareas'));

// Conectar con MongoDB
mongoose.connect(process.env.URLDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err;
        console.log("Base de Datos ONLINE!");
    });

app.listen(process.env.PORT, () => {
    console.log("Escuchando en el puerto", process.env.PORT);
});