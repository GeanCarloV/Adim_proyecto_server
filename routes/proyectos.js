// routes > proyectos
const express = require('express'); 
const router = express.Router(); 
const proyectoController = require('../controllers/proyectoController');
// importamos nuestro middleware 
const auth = require('../midleware/auth'); 
const { check } = require('express-validator'); 

// crear proyectos 
// api/proyectos
router.post('/', 
    // verifica todo lo que tenemos en el middleware de auth 
    // y lueg psas al sigueinte midlleware
    auth,
    [
        check('nombre', 'El nombre del proycecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

// par q solo el usario vea sus proyectos
// obteineod todos lod poryectos
router.get('/', 
    // verificamos q este autentificado 
    auth,
    proyectoController.obtenerProyectos
);

// actualizar poryecto via id 
// el id es un comidin para que lo vaya actualizando
// el id lo va cambiando xress 
router.put('/:id', 
    // primero lo auntentificamos 
    auth,
    // luego lo validamos q tenga nombre
    [
        check('nombre', 'El nombre del proycecto es obligatorio').not().isEmpty()
    ],
    // luego se agrege en el midelware 
    proyectoController.actualizarProyecto
); 

// eliminar un proyceto por su id
router.delete('/:id', 
    auth,
    proyectoController.eliminaProyecto
);

module.exports = router; 

  