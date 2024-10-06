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
route.get('/admin/deshboard',checkAuth,AdminController.deshboard)
route.get('/admin/StudentDisplay',checkAuth,AdminController.display)
route.get('/admin/addUser',checkAuth,AdminController.adduser)
route.get('/admin/viewUser/:id',checkAuth,AdminController.viewUser)
route.get('/admin/editUser/:id',checkAuth,AdminController.editUser)
route.post('/admin/updateUser/:id',checkAuth,AdminController.updateUser)
route.get('/admin/deleteUser/:id',checkAuth,AdminController.deleteUser) 
route.post('/admin/userInsert',checkAuth,AdminController.userInsert)  
//admin course display
route.get('/admin/courseDisplay',checkAuth,AdminController.courseDisplay)
route.get('/admin/courseView/:id',checkAuth,AdminController.courseView)




//coursecontroller
route.post('/courseInsert',checkAuth,CourseController.courseInsert)
route.get('/course/Display',checkAuth,CourseController.courseDisplay)
route.get('/course/View/:id',checkAuth,CourseController.courseView)
route.get('/course/Edit/:id',checkAuth,CourseController.courseEdit)
route.post('/course/Update/:id',CourseController.courseUpdate)
route.get('/course/Delete/:id',CourseController.courseDelete)







module.exports =route