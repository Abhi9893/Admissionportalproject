const jwt = require('jsonwebtoken')
const UserModel = require('../moduls/user')

const isLogin = async(req,res,next)=>{
    // console.log('hello abhi')
    const {token}= req.cookies
    // console.log(token)
    if(token){
        res.redirect('/home')
    }
    next()
}
module.exports = isLogin