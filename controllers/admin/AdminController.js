const UserModuls = require('../../moduls/user')
const CourseModel = require('../../moduls/course')
const cloudinary = require('cloudinary')
const nodemailer = require('nodemailer')

class AdminController {
    static deshboard = async (req, res) => {
        try {
            const{name,image}=req.userData
            res.render('admin/deshboard',{n:name,i:image})
        } catch (error) {
            console.log(error)
        }
    }

    static display = async (req, res) => {
        try {
            const{name,image}=req.userData
            const data = await UserModuls.find()
            // console.log(data)
            res.render('admin/display', { d: data,n:name,i:image });
        } catch (error) {
            console.log(error)
        }
    }

    static adduser = async (req, res) => {
        try {
            const{name,image}=req.userData
            res.render('admin/adduser')
        } catch (error) {
            console.log(error)
        }
    }
    static viewUser = async (req, res) => {
        try {
            const{name,image}=req.userData
            const id = req.params.id;
            // console.log(id)
            const data = await UserModuls.findById(id)
            // console.log(data)
            res.render('admin/viewUser', { d: data,n:name,i:image });
        } catch (error) {
            console.log(error)
        }
    }
    static editUser = async (req, res) => {
        try {
            const{name,image}=req.userData
            const id = req.params.id;
            // console.log(id)
            const data = await UserModuls.findById(id)
            //console.log(data)
            res.render('admin/editUser', { d: data,n:name,i:image });
        } catch (error) {
            console.log(error)
        }
    }
    static updateUser = async (req, res) => {
        try {
            const{name,image}=req.userData
            const id = req.params.id;
            const { n, e, p } = req.body
            // console.log(id)
            const data = await UserModuls.findByIdAndUpdate(id, {
                name: n,
                email: e,
                password: p
            })
            res.redirect("/admin/StudentDisplay",{n:name,i:image}) //route

        } catch (error) {
            console.log(error)
        }
    }
    static deleteUser = async (req, res) => {
        try {
            const{name,image}=req.userData
            const id = req.params.id;
            const { n, e, p } = req.body
            // console.log(id)
            const data = await UserModuls.findByIdAndDelete(id)
            res.redirect("/admin/StudentDisplay",{n:name,i:image}) //route

        } catch (error) {
            console.log(error)
        }
    }
    static userInsert =async(req,res)=>{
        try{
            const{name,image}=req.userData
            //res.send("contact page")
            console.log(req.files)
            // console.log(req.body) 
            const file = req.files.image
            const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{folder:"profile"})
            // console.log(imageUpload)
            // console.log(file)
            const{n,e,p,cp}= req.body
            const result = new UserModel({
                name:n,
                email:e,
                password:p,
                image:{
                    public_id:imageUpload.public_id,
                    url:imageUpload.secure_url
                }
            })
            await result.save()
            res.redirect('/') //route ka url

        }catch(error)
        {
            console.log(error)
        }
    }

    /* course display */ 
    static courseDisplay = async (req, res) => {
        try {
            const{name,image}=req.userData
            const data = await CourseModel.find()
            // console.log(data)
            res.render('admin/course/display', { d: data,n:name,i:image });
        } catch (error) {
            console.log(error)
        }
    }
    static courseView = async (req, res) => {
        try {
            const{name,image}=req.userData
            const id = req.params.id;
            // console.log(id)
            const data = await CourseModel.findById(id)
            // console.log(data)
            res.render('admin/course/view',{ d: data ,n:name,i:image });
        } catch (error) {
            console.log(error)
        }
    }
    static courseEdit = async (req, res) => {
        try {
            const{name,image}=req.userData
            const id = req.params.id;
            // console.log(id)
            const data = await UserModuls.findById(id)
            //console.log(data)
            res.render('admin/course/Edit', { d: data,n:name,i:image });
        } catch (error) {
            console.log(error)
        }
    }
    static statusUpdate = async (req,res) =>{
        try {
            const{name,email,status,comment} = req.body
            const id = req.params.id
            const data = await CourseModel.findByIdAndUpdate(id,{
                status: status,
                comment: comment
            })
            //console.log(data)
            this.sendEmail(name,email,status,comment)
            res.redirect("/admin/courseDisplay")
        } catch (error) {
            console.log(error)
        }
    }

    static sendEmail = async (name,email,status,comment)=>{
        // console.log(name,email,status,comment)
        //connect with the smtp server
    
        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
    
            auth:{
                user: "patsariya.abhi@gmail.com ",
                pass: "gdjrtxvgmmewdmic",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gamil.com", //sender address
            to: email, //list of receivers
            subject: `course ${course}`, //subject line
            text: "hello", //plain text body 
            html: `<b>${course}</b> course <b>${course}</b> insert successful ! <br>
            <b> comment from Admin </b> ${comment}`, //html body
        });
    };

}
module.exports = AdminController