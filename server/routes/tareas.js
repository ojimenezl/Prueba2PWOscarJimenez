const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Tareas = require('../models/tareas');

const app = express();

app.get('/tarea', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Tareas.find({ estado: true }, 'tarea descripcion dia color')
        .skip(desde)
        .limit(limite)
        .exec((err, tareas) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Tareas.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    tareas,
                    numero: conteo
                });
            });
        })
});

app.post('/tarea', (req, res) => {

    let body = req.body

    let tarea = new Tareas({
        tarea: body.tarea,
        descipcion: body.desc,
        dia: bcrypt.hashSync(body.dia, 10),
        color: body.color
    });

    tarea.save((err, tareaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            tarea: tareaDB
        });
    });
});

app.put('/tarea/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Tareas.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });
});

app.delete('/tarea/:id', (req, res) => {

    let id = req.params.id;
    // Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
    let cambiarEstado = {
        estado: false
    }

    Tareas.findByIdAndUpdate(id, cambiarEstado, { new: true, context: 'query' }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBD) {
            res.json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioBD
            });
        }
    });
});



module.exports = app;