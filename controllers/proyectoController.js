// controllers > proyectoController.js 
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator'); 



exports.crearProyecto = async (req, res) => { 
    // revisar si hay errores, por la validacion del rauter
    const errores = validationResult(req); 
    if(!errores.isEmpty()){ 
        return res.status(400).json({errores: errores.array() })
    }


    try { 
        // crear un nuevo proyecto con el model de mongo 
        const proyecto = new Proyecto(req.body); 
        // guardamos el proyecvto via JWT , 
        // lo realiacionmos co el usario    
        proyecto.creador = req.usuario.id; 

        // guardamos el proyecto creado
        proyecto.save(); 
        res.json(proyecto); 
    } catch (error) {
        console.log(error)
        res.error(500).send('Hubo un error');
    }
}; 

// obteien todo los proyectos del usario actual
exports.obtenerProyectos = async (req, res) => { 
    try { 
        // con el obje q se hizo en la auntentificacion
        // lo creamos y traemos todos los proyectos el mismo id 
        // con el sort -1 lo ordenamos para que lo muestre
        const proyectos = await Proyecto.find({creador: req.usuario.id }).sort({creado: -1});
        res.json({ proyectos });
    } catch (error) { 
        console.log(error); 
        res.status(500).send('Hubo un error')
    }
}

// actualizar un proyecto por idd
exports.actualizarProyecto = async(req, res) => { 
    
    // revisar si hay errores, por la validacion del rauter
    const errores = validationResult(req); 
    if(!errores.isEmpty()){ 
        return res.status(400).json({errores: errores.array() })
    }

    // estreer la info del proyecto 
    const {nombre} = req.body; 
    // creando el nuevo proyecto q reescribe el anterior
    const nuevoProyecto = {}; 
    // si agrego un nuevo nombre lo introducmiosl al usuario
    if(nombre){ 
        nuevoProyecto.nombre = nombre;
    }

    // para acutilziarlo
    try {   
        // revisamos el ID, q se va auctulizar
        // cada vez q se consulta a bd se poen await 
        let proyecto = await Proyecto.findById(req.params.id);

        // si el proyecto exite o no 
        if(!proyecto){
            return res.status(404).json({msq: 'Proyecto no encontrado'})
        }

        // verificamos eel creador del proyecto 
        // cpomo guardamos el json web token como paylod el id 
        // tenemos toda la informcacion
        // una capa extra de seguridad
        if(proyecto.creador.toString() !== req.usuario.id ) {
            // el 401 es para no seguro
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // actualizamos
        // como es consulta a la bd le ponemos await, con el modele ecnontaramos por id
        // y lo actualizamos con el metodo, y luego le damos el nuevo objeto a actualizar 
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id}, {$set: nuevoProyecto}, {new: true}); 

        // damos la respuesta en json de proyecto
        res.json({proyecto})

    } catch (error) {
        console.log(error); 
        res.status(500).send('Error en el servidor')
    }


}

// elimina un proyecto por id 
exports.eliminaProyecto = async (req, res) => { 
    try {
        // revisamos el id 
        let proyecto = await Proyecto.findById(req.params.id); 

        // el proyecto existe o no 
        if(!proyecto) { 
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // verificamos el creador del proyecto 
        // q esto lo envia el jwt
        if(proyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // eliminamos el proyecto 
        await Proyecto.findOneAndRemove({_id : req.params.id }); 
        res.json({msg: 'proyecto eliminado'})

    } catch (error){
        console.log(error); 
        res.status(500).send('Error en el servidor')
    }
}