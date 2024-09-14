const UserModel = require('../moduls/user')

class FrontController{
    static home = async(req,res)=>{
        try{
            res.render("home")
        }catch(error)
        {
            console.log(error)
        }
    }
    static about =async(req,res)=>{
        try{
            res.render("about")
        }catch(error)
        {
            console.log(error)
        }
    }
    static login =async(req,res)=>{
        try{
            res.render("login")
        }catch(error)
        {
            console.log(error)
        }
    }
    static register =async(req,res)=>{
        try{
            res.render("register")
        }catch(error)
        {
            console.log(error)
        }
    }
    static contact =async(req,res)=>{
        try{
            res.render("contact")
        }catch(error)
        {
            console.log(error)
        }
    }
    static userInsert =async(req,res)=>{
        try{
            console.log(req.body)
            // console.log(req.body) 
            // const{n,e,p,cp}= req.body
            // const result = new UserModel({
            //     name:n,
            //     email:e,
            //     password:p
            // })
            // await result.save()
            // res.redirect('/') //route ka url

        }catch(error)
        {
            console.log(error)
        }
    }
}

module.exports =FrontController