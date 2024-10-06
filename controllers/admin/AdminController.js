const UserModuls = require('../../moduls/user')
const CourseModel = require('../../moduls/course')

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

}
module.exports = AdminController