const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String,
            request:true,
        },
        url:{
            type:String,
            request:true,
        }
    },
    role:{
        type:String,
        default:'user'
    },
}, {timestamps: true})

const UserModel =mongoose.model('user',UserSchema)
module.exports = UserModel