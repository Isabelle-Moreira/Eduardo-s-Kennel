const port = process.env.port || 3000
const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const db = require('./database/database')
const app = express()

app.use(cors())
app.use(express.json())
db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));
app.use(express.urlencoded({extended: true}))

app.use('/eduardos', routes)
app.listen(port, ()=>{
    console.log(`Server up and running on port ${port}`)
})