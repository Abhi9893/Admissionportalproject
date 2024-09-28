const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
    phone:{
        type:String,
        Required:true
    },
    dob:{
        type:String,
        Required:true
    },
    address:{
        type:String,
        Required:true
    },
    gender:{
        type:String,
        Required:true
    },
    qualification:{
        type:String,
        Required:true
    },
    coures:{
        type:String,
        Required:true
    },
    user_id:{
        type:String,
        Required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    comment:{
        type:String,
        default:"pending"
    },

},{timestamps:true})
const CourseModel = mongoose.model('coures',CourseSchema)
module.exports= CourseModel