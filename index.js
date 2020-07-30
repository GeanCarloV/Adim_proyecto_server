// index.js

const express = require('express'); 
const conectarDB = require('./config/db'); 

const app = express(); 


conectarDB();

app.use( express.json({ extended: true }));

const PORT = process.env.PORT || 4000; 


app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => { 
    console.log(`EL servidor esta funcionando en el puerto ${PORT}`)
}); 
