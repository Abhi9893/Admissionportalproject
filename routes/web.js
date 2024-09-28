const express = require("express")
const FrontController = require("../controllers/FrontController")
const AdminController = require("../controllers/admin/AdminController")
const route = express.Router()
const checkAuth = require("../middleware/checkAuth")
const CourseController = require("../controllers/courseController")

//routeing
route.get('/home',checkAuth,FrontController.home)
route.get('/about',checkAuth,FrontController.about)
route.get('/',FrontController.login)
route.get('/register',FrontController.register)
route.get('/contact',checkAuth,FrontController.contact)

//insert data
route.post('/userInsert',FrontController.userInsert)
route.post('/verifylogin',FrontController.verifylogin)
route.get('/logout',FrontController.logout)

//admincontroller
route.get('/admin/deshboard',AdminController.deshboard)
route.get('/admin/StudentDisplay',AdminController.display)
route.get('/admin/addUser',AdminController.adduser)
route.get('/admin/viewUser/:id',AdminController.viewUser)
route.get('/admin/editUser/:id',AdminController.editUser)
route.post('/admin/updateUser/:id',AdminController.updateUser)
route.get('/admin/deleteUser/:id',AdminController.deleteUser) 
route.post('/admin/userInsert',AdminController.userInsert)  


//coursecontroller
route.post('/courseInsert',checkAuth,CourseController.courseInsert)






module.exports =route