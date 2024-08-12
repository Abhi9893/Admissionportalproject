const express = require("express")
const FrontController = require("../controllers/FrontController")
const route = express.Router()

//routeing
route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/login',FrontController.login)
route.get('/register',FrontController.register)
route.get('/contact',FrontController.contact)




module.exports =route