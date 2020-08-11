// servidor > index.js

const express = require('express'); 
const conectarDB = require('./config/db'); 
const cors = require('cors')
const app = express(); 


conectarDB();
// habilitar cors 
app.use(cors()); 


app.use( express.json({ extended: true }));

const port = process.env.port || 4000; 


app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

app.listen(port, '0.0.0.0', () => { 
    console.log(`EL servidor esta funcionando en el puerto ${port}`)
}); 
