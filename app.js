const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')

//routeing
app.use('/',web)


//server create
app.listen(port,() =>{console.log(`server start localhost: ${port}`)})