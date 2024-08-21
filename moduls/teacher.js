const mongoose = require('mongoose')

const TeacherSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'teacher'
    },
}, {timestamps: true})
const TeacherModel = mongoose.model('teacher',TeacherSchema)
module.exports = TeacherModel