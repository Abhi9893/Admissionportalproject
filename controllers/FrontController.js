const UserModel = require('../moduls/user')
const cloudinary = require('cloudinary').v2


cloudinary.config({ 
    cloud_name: 'dyblatmzo', 
    api_key: '757875579268529', 
    api_secret: 'OaD3lbfPxv_CrCd-pcIFiOtlDKw' // Click 'View API Keys' above to copy your API secret
});

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
            res.render("register",{message:req.flash('error')});
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
            // //res.send("contact page")
            // console.log(req.files)
            // // console.log(req.body) 
            // const file = req.files.image
            // const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{folder:"profile"})
            // // console.log(imageUpload)
            // // console.log(file)
            const{n,e,p,cp}= req.body
            const user = await UserModel.find({email:e})
            if(user){
                req.flash('error','Email already Exit')
                res.redirect('/register')
            }else{
                if(n && e && p && cp){
                    if(p == cp){
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: p,
                            image:{
                                public_id: imageUpload.public_id,
                                url: imageUpload.secure_url,
                            },
                        });
                        // To save data 
                        await result.save();
                        res.redirect('/')

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
}

module.exports =FrontController