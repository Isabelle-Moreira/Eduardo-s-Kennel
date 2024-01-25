const port = process.env.port || 3000
const express = require('express')
const cors = require('cors')
/*const database = require('./database/database')

const routes = require('./routes/routes')*/

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

/*app.use('/petshop', routes)*/

app.listen(port, ()=>{
    console.log(`Server up and running on port ${port}`)
})