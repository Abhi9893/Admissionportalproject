const CourseModel = require('../moduls/course')
class CourseController{

static courseInsert = async(req,res)=>{
    try {
        const {id}= req.userData
        const{name,email,phone,dob,address,gender,qualification,course}= req.body
        const result = new CourseModel({
            name:name,
            email:email,
            phone:phone,
            address:address,
            dob:dob,
            gender:gender,
            qualification:qualification,
            course:course,
            user_id:id
        })
        await result.save()
     
        
    } catch (error) {
        console.log(error)
    }
}
static courseDisplay = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}
static courseView = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}
static courseEdit= async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}
static courseUpdate = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}
static courseDelete = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}
}
module.exports= CourseController