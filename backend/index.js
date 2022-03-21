const connetToMongo = require('./db');
const express = require('express');

connetToMongo();        //  Calling connectToMongo from ./db.js

const app = express();
const port = 5000;

app.use(express.json()); //  MiddleWare - If not use then console return undefined

// Available Routes
app.use('/api/createUser', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`iNoteBook - Backend app listening at http:/localhost/${port}`)
})