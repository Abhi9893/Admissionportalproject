const express = require("express")
const FrontController = require("../controllers/FrontController")
const AdminController = require("../controllers/admin/AdminController")
const route = express.Router()
const checkAuth = require("../middleware/checkAuth")
const CourseController = require("../controllers/CourseController")
const adminRole = require('../middleware/adminRole')
const isLogin = require('../middleware/isLogin')

//routeing
route.get('/home',checkAuth,FrontController.home)
route.get('/about',checkAuth,FrontController.about)
route.get('/',isLogin,FrontController.login)
route.get('/register',FrontController.register)
route.get('/contact',checkAuth,FrontController.contact)

//insert data
route.post('/userInsert',FrontController.userInsert)
route.post('/verifylogin',FrontController.verifylogin)
route.get('/logout',FrontController.logout)

//profile
route.get('/profile',checkAuth,FrontController.profile)
route.post('/updateprofile',checkAuth,FrontController.updateprofile)
route.post('/changepassword',checkAuth,FrontController.changepassword)




//admincontroller
route.get('/admin/deshboard',checkAuth,adminRole('admin'),AdminController.deshboard)
route.get('/admin/StudentDisplay',checkAuth,adminRole('admin'),AdminController.display)
route.get('/admin/addUser',checkAuth,adminRole('admin'),AdminController.adduser)
route.get('/admin/viewUser/:id',checkAuth,adminRole('admin'),AdminController.viewUser)
route.get('/admin/editUser/:id',checkAuth,adminRole('admin'),AdminController.editUser)
route.post('/admin/updateUser/:id',checkAuth,adminRole('admin'),AdminController.updateUser)
route.get('/admin/deleteUser/:id',checkAuth,adminRole('admin'),AdminController.deleteUser) 
route.post('/admin/userInsert',checkAuth,adminRole('admin'),AdminController.userInsert)  
//admin course display
route.get('/admin/courseDisplay',checkAuth,adminRole('admin'),AdminController.courseDisplay)
route.get('/admin/courseView/:id',checkAuth,adminRole('admin'),AdminController.courseView)
route.get('/admin/courseEdit/:id',checkAuth,adminRole('admin'),AdminController.courseEdit)
// route.post('/admin/courseUpdate/:id',checkAuth,adminRole('admin'),AdminController.courseUpdate)
// route.get('/admin/courseDelete/:id',checkAuth,adminRole('admin'),AdminController.courseDelete)

// status update
route.post("/admin/statusUpdate/:id",checkAuth,adminRole('admin'),AdminController.statusUpdate)

//forget password
route.post('/forgot_password',FrontController.forgetPasswordVerify)


//coursecontroller
route.post('/courseInsert',checkAuth,CourseController.courseInsert)
route.get('/course/Display',checkAuth,CourseController.courseDisplay)
route.get('/course/View/:id',checkAuth,CourseController.courseView)
route.get('/course/Edit/:id',checkAuth,CourseController.courseEdit)
route.post('/course/Update/:id',CourseController.courseUpdate)
route.get('/course/Delete/:id',CourseController.courseDelete)







module.exports =route