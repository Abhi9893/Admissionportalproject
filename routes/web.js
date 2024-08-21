const express = require("express")
const FrontController = require("../controllers/FrontController")
const route = express.Router()

//routeing
route.get('/home',FrontController.home)
route.get('/about',FrontController.about)
route.get('/',FrontController.login)
route.get('/register',FrontController.register)
route.get('/contact',FrontController.contact)




module.exports =route