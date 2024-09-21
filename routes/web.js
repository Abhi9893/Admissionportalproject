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

route.post('/verifylogin',FrontController.verifylogin)

//admincontroller
route.get('/admin/deshboard',AdminController.deshboard)
route.get('/admin/StudentDisplay',AdminController.display)
route.get('/admin/addUser',AdminController.adduser)
route.get('/admin/viewUser/:id',AdminController.viewUser)
route.get('/admin/editUser/:id',AdminController.editUser)
route.post('/admin/updateUser/:id',AdminController.updateUser)
route.get('/admin/deleteUser/:id',AdminController.deleteUser) 
route.post('/admin/userInsert',AdminController.userInsert)  







module.exports =route