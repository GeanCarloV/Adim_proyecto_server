// servidor > controllers > authController.js  

const Usuario = require('../models/Usuario'); 
const bcyptjs = require('bcryptjs'); 
const { validationResult } = require('express-validator'); 
const jwt = require('jsonwebtoken'); 

exports.autenticarUsuario = async (req, res) => { 
    const errores = validationResult(req); 
    if( !errores.isEmpty() ) { 
        return res.status(400).json({errores: errores.array() })
    }
    
    const { email, password } = req.body;

    try { 
        let usuario = await Usuario.findOne({ email }); 
        if(!usuario) { 
            return res.status(400).json({msg: 'El usario no existe'});
        }

        const passCorrecto = await bcyptjs.compare(password, usuario.password); 
        if(!passCorrecto) { 
            return res.status(400).json({msg: 'Password Incorrecto'})
        }

        const payload = { 
            usuario: { 
                id: usuario.id
            }
        }; 
        jwt.sign(payload, process.env.SECRETA, { 
            expiresIn: 3600 // 1 hora 
        }, (error, token) => { 
            if(error) throw error; 
            res.json({ token })
        })

    } catch (error) { 
        console.log(error)
    }
}

// otbiene que usario esta auntenticado 
exports.usuarioAutenticado = async (req, res) => { 
    try {
        // enviamsoe l objeto pero sin el password, es la forma en 
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'})
    }
}