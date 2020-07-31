// routes > tareas.js

const express = require('express'); 
const router = express.Router(); 
const tareaController = require('../controllers/tareaController');
const auth = require('../midleware/auth'); 
const { check } = require('express-validator'); 

router.post('/', 
    auth,
    [ 
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto tambein es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

router.get('/', 
    auth,
    tareaController.obtenerTareas
)

router.put('/:id',
    auth, 
    tareaController.actualizarTarea
);

router.delete('/:id', 
    auth, 
    tareaController.eliminarTarea
);

module.exports = router; 