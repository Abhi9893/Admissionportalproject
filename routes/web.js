const express = require("express")
const FrontController = require("../controllers/FrontController")
const AdminController = require("../controllers/admin/AdminController")
const route = express.Router()

//routeing
route.get('/home',FrontController.home)
route.get('/about',FrontController.about)
route.get('/',FrontController.login)
route.get('/register',FrontController.register)
route.get('/contact',FrontController.contact)

//insert data
route.post('/userInsert',FrontController.userInsert)

//admincontroller
route.get('/admin/deshboard',AdminController.deshboard)
route.get('/admin/StudentDisplay',AdminController.display)
route.get('/admin/addUser',AdminController.adduser)







module.exports =route