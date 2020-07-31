// models > Proyecto.js

const mongoose = require('mongoose'); 

const ProyectoSchema = mongoose.Schema({ 
    //cada proyecto tiene un nonbre, 
    // un creador un usario q solo lo puede ver,
    //  y la fecha de creacion ¿
    nombre: { 
        type: String, 
        require: true, 
        trim: true
    }, 
    creador: {
        // la referencia al id dle usario   
        type: mongoose.Schema.Types.ObjectId, 
        // tiene q ser el nombre del modelo relacionado, 
        // para relacionarce autmaticamente
        ref: 'Usuario'
    }, 
    creado: { 
        type: Date, 
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema)
