const connetToMongo = require('./db');
const express = require('express')

connetToMongo();

const app = express()
const port = 3000

app.use(express.json()) //  MiddleWare - If not use then console return undefined

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`iNoteBook - Backend app listening at http:/localhost/${port}`)
})