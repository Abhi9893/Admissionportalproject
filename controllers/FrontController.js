const UserModel = require('../moduls/user')
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const noadmailer = require('nodemailer')
const randomstring = require("randomstring");
const CourseModel = require("../moduls/course")


cloudinary.config({ 
    cloud_name: 'dyblatmzo', 
    api_key: '757875579268529', 
    api_secret: 'OaD3lbfPxv_CrCd-pcIFiOtlDKw' // Click 'View API Keys' above to copy your API secret
});

class FrontController{
    static home = async(req,res)=>{
        try{
            const{name,image,email,id,role}= req.userData
            const Btach = await CourseModel.findOne({user_id: id,course:"Btach"})
            const bca = await CourseModel.findOne({user_id: id, course:"bca"})
            const mca = await CourseModel.findOne({user_id: id, course:"mca"})
            res.render("home",{
                n:name,
                i:image,
                e:email,
                Btach:Btach,
                bca:bca,
                mca:mca,
                role:role
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
                    if(user.role=="admin"){
                        //token create
                 var token = jwt.sign({ID: user._id},'dkjfc98adfsdbf878bch') 
                 //  console.log(token) 
                 res.cookie('token',token) 
 
                 //admin login
                 res.redirect('/admin/deshboard')

                }
                if(user.role== "user"){
                    //token create
                 var token = jwt.sign({ID: user._id},'dkjfc98adfsdbf878bch') 
                 //  console.log(token) 
                 res.cookie('token',token) 
 
                 //admin login
                 res.redirect('/home')
                }
                 
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
    //profile
    static profile =async(req,res)=>{
        try{
            const {name,image,email}= req.userData
            res.render("profile",{
                n:name,
                i:image,
                e:email
            })
            
        }catch(error)
        {
            console.log(error)
        }
    }

    static changepassword = async (req, res)=>{
        try {
            const {id} = req.udata
            //console.log(req.body)
            const {op,np,cp}=req.body;
            if(op && np && cp){
                const user = await UserModel.findById(id)
                const isMatched = await bcrypt.compare(op,user.password);
                // console.log(isMatched)
                if(! isMatched){
                    req.flash("error", "current password is incorrect");
                    res.redirect("/profile");
                }else{
                    if(np != cp){
                        req.flash("error","password does not match");
                        res.redirect("/profile");
                    }else{
                        const newHashPassword = await bcrypt.hash(np, 10);
                        await UserModel.findByIdAndUpdate(id,{
                            password: newHashPassword
                        })
                        req.flash("success","  password update sucessfully ");
                        res.redirect("/");
                    }
                }
            }else{
                req.flash("error","All fields are required");
                res.redirect("/profile");
            }
        } catch (error) {
            console.log(error);
        }
    }

static updateprofile = async(req,res)=>{
    try {
        const {id} = req.userData;
        const {name , email, role} = req.body;
        if (req.files){
            const user = await UserModel.findById(id);
            const imageID = user.image.public_id;
            console.log(imageID);

            //deleting image from cloudinary
            await cloudinary.uploader.destroy(imageID);
            // new image update
            const imagefile = req.files.image;
            const imageUpload = await cloudinary.uploader.upload(
                imagefile.tempFilePath,{
                    folder: "userprofile",
                }
            );
            var data = {
                name: name,
                email: email,
                image:{
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url,
                },
            };
        }else {
            var data = {
                name: name,
                email: email,
            };
        }
        await UserModel.findByIdAndUpdate(id,data);
        req.flash("sucess","update profile sucessfully");
        res.redirect("/profile");   
    } catch (error) {
        console.log("error")
    }
}
//forget password
static forgetPasswordVerify = async (req, res) => {
    try {
      const { email } = req.body;
      const userData = await UserModel.findOne({ email: email });
      //console.log(userData)
      if (userData) {
        //npm i randomstring
        const randomString = randomstring.generate();
        await UserModel.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        this.sendEmail(userData.name, userData.email, randomString);
        req.flash("success", "Plz Check Your mail to reset Your Password!");
        res.redirect("/");
      } else {
        req.flash("error", "You are not a registered Email");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
static sendEmail = async (name, email, token) => {
    // console.log(name,email,status,comment)
    // connenct with the smtp server

    let transporter = await noadmailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "patsariya.abhi@gmail.com ",
        pass: "gdjrtxvgmmewdmic",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text: "heelo", // plain text body
      html:
        "<p>Hii " +
        name +
        ',Please click here to <a href="http://localhost:3000/reset-password?token=' +
        token +
        '">Reset</a>Your Password.',
    });
  };


}

module.exports =FrontController