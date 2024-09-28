const UserModel = require('../moduls/user')
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


cloudinary.config({ 
    cloud_name: 'dyblatmzo', 
    api_key: '757875579268529', 
    api_secret: 'OaD3lbfPxv_CrCd-pcIFiOtlDKw' // Click 'View API Keys' above to copy your API secret
});

class FrontController{
    static home = async(req,res)=>{
        try{
            const{name,image}= req.userData
            res.render("home",{
                n:name,
                i:image
            })

            
        }catch(error)
        {
            console.log(error)
        }
    }
    static about =async(req,res)=>{
        try{
            const {name,image}= req.userData
            res.render("about",{
                n:name,
                i:image
            })
        }catch(error)
        {
            console.log(error)
        }
    }
    static login =async(req,res)=>{
        try{
            res.render("login",{msg:req.flash("success"), msg1:req.flash("error")});
        }catch(error)
        {
            console.log(error)
        }
    }
    static register =async(req,res)=>{
        try{
            res.render("register",{message:req.flash('error')});
        }catch(error)
        {
            console.log(error)
        }
    }
    static contact =async(req,res)=>{
        try{
            const {name,image}= req.userData
            res.render("contact",{
                n:name,
                i:image
            })
        }catch(error)
        {
            console.log(error)
        }
    }
    static userInsert =async(req,res)=>{
        try{
            // //res.send("contact page")
            // console.log(req.files)
            // // console.log(req.body) 
            // const file = req.files.image
            // const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{folder:"profile"})
            // // console.log(imageUpload)
            // // console.log(file)
            const{n,e,p,cp}= req.body
            const user = await UserModel.findOne({email:e})
            if(user){
                req.flash('error','Email already Exit')
                res.redirect('/register')
            }else{
                if(n && e && p && cp){
                    if(p == cp){
                        const hashPassword = await bcrypt.hash(p, 10);
                        const file = req.files.image
                        const imageUpload = await cloudinary.uploader.upload(
                            file.tempFilePath,
                            {
                                folder:"profile",
                            }
                        );
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: hashPassword, 
                            image:{
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url,
                            },
                        });
                        // To save data 
                        await result.save();
                        req.flash("success","Register Sucessfull Insert ! Plz Login");
                        res.redirect('/');

                        //console.log(userdata)
                    }else{
                        req.flash("error","password & Confirm password must be same.");
                        res.redirect("/register");
                    }

                }else{
                    req.flash("error","All Fields are Reqired.");
                    res.redirect("/register");
                }
            }
            

            // const result = new UserModel({
            //     name:n,
            //     email:e,
            //     password:p,
            //     image:{
            //         public_id:imageUpload.public_id,
            //         url:imageUpload.secure_url
            //     }
            // })
            // await result.save()
            // res.redirect('/') //route ka url

        }catch(error)
        {
            console.log(error)
        }
    }
    static verifylogin = async (req,res)=>{
        try {

            const {email, password} = req.body
            // console.log(req.body)
            const user = await UserModel.findOne({email:email})
            // console.log(user)
            if(user != null){
                const isMatch = await bcrypt.compare(password,user.password)
                if(isMatch){
                 //token create
                 var token = jwt.sign({ID: user._id},'dkjfc98adfsdbf878bch') 
                //  console.log(token) 
                res.cookie('token',token) 

                //admin login
                res.redirect('/home')
                }else{
                    req.flash("error","email or password is not  vaild.")
                    res.redirect("/")
                }

            }else{
                req.flash("error", "you are not a registered user.")
                res.redirect("/")
            }
        } catch (error) {
           console.log(error) 
        }
    }
    static logout =async(req,res)=>{
        try{
            res.clearCookie("token")
            res.redirect("/")
        }catch(error)
        {
            console.log(error)
        }
    }

}

module.exports =FrontController