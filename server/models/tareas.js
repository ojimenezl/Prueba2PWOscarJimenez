const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let coloresValidos = {
    values: ['verde', 'rojo'],
    message: '{VALUE} no es un color válido'
}

let tareaSchema = new Schema({
    tarea: {
        type: String,
        required: [true, 'la tarea es requerido'],
        unique: true
    },
    descripcion: {
        type: String,
        required: false,

    },
    dia: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'rojo',
        enum: coloresValidos
    }

});

tareaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

tareaSchema.methods.toJSON = function() {
        let tarea = this;
        let tareaObject = tarea.toObject();
        delete tareaObject.password;

        return tareaObject;
    }
    // nombre de la coleccion
module.exports = mongoose.model('tareas', tareaSchema);