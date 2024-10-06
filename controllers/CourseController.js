const courseModel = require('../moduls/course')
class CourseController{

static courseInsert = async(req,res)=>{
    try {
        const {id}= req.userData
        const{name,email,phone,dob,address,gender,qualification,course}= req.body
        const result = new courseModel({
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
        res.redirect('/course/display')  
        await result.save() 
    } catch (error) {
        console.log(error)
    }
}
static courseDisplay = async(req,res)=>{
    try {
        const{id,name,image} = req.userData

        const data = await courseModel.find()
        res.render('course/Display',{d:data, n:name, i:image})
    } catch (error) {
        console.log(error)
    }
}
static courseView = async(req,res)=>{
    try {
        const{name,email,image} = req.userData
        const id = req.params.id;
        // console.log(id)
        const data = await courseModel.findById(id)
        // console.log(data)
        res.render('course/View',{ d:data,e:email,i:image,n:name});
    } catch (error) {
        console.log(error)
    }
}
static courseEdit= async(req,res)=>{
    try {
        const id = req.params.id;
        const{name,email,image} = req.userData
        // console.log(id)
        const data = await courseModel.findById(id)
        //console.log(data)
        res.render('course/edit', { d:data,n:name,i:image });
    } catch (error) {
        console.log(error)
    }
}
static courseUpdate = async(req,res)=>{
    try {
        const{name,email,phone,dob,address,gender,qualification,course}=req.body
        const id =req.params.id
        const update =await courseModel.findByIdAndUpdate(id,{
            name:name,
            email:email,
            phone:phone,
            address:address,
            dob:dob,
            gender:gender,
            qualification:qualification,
            course:course,

        })
        res.redirect("/course/Display")
        
    } catch (error) {
        console.log(error)
    }
}
static courseDelete = async(req,res)=>{
    try {
        const id = req.params.id
        const data = await courseModel.findByIdAndDelete(id)
        res.redirect("/course/Display")
    } catch (error) {
        console.log(error)
    }
}
}
module.exports= CourseController