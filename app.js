const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const { connect } = require('mongoose')
const connectDb = require('./db/connectDb')
const fileUpload = require('express-fileupload');

const cookieparser = require('cookie-parser')
app.use(cookieparser())

//html css set
app.set('view engine','ejs')

//css image link
app.use(express.static('public'))

//fileupload image
app.use(fileUpload({
    limits:{fileSize: 50 * 1024 * 1024},
    useTempFiles: true,
// //dir for window pc
//  tempFileDir: path.join(__dirname, '/.temp')

}));

// connect flash and sessions
const session = require('express-session')
const flash = require('connect-flash');
// messages
app.use(session({
    secret: 'secret',
    cookie: {maxAge:60000},
    resave: false,
    saveUninitialized: false,
}));
//flash messages
app.use(flash());


//connect db
connectDb()

app.use(express.urlencoded({extended:true}));


//routeing
app.use('/',web)

//server create
app.listen(port,() =>{console.log(`server start localhost: ${port}`)})