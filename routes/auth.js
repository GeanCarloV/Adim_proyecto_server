// servidor > routers > auth.js 

const express = require('express'); 
const router = express.Router(); 
const { check } = require('express-validator'); 
const authController = require('../controllers/authController');
const auth = require('../midleware/auth');

// para iniciar secion
router.post('/', 
    //la validacion lo tenemos en lado del cliente en react    
    authController.autenticarUsuario
); 


// obtiene el usario auntenticado
router.get('/', 
    auth, 
    authController.usuarioAutenticado
);


module.exports = router;