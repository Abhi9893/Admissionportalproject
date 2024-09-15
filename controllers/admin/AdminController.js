const UserModuls = require('../../moduls/user')

class AdminController {
    static deshboard = async (req, res) => {
        try {
            res.render('admin/deshboard')
        } catch (error) {
            console.log(error)
        }
    }

    static display = async (req, res) => {
        try {
            const data = await UserModuls.find()
            // console.log(data)
            res.render('admin/display', { d: data });
        } catch (error) {
            console.log(error)
        }
    }

    static adduser = async (req, res) => {
        try {
            res.render('admin/adduser')
        } catch (error) {
            console.log(error)
        }
    }
    static viewUser = async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(id)
            const data = await UserModuls.findById(id)
            // console.log(data)
            res.render('admin/viewUser', { d: data });
        } catch (error) {
            console.log(error)
        }
    }
    static editUser = async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(id)
            const data = await UserModuls.findById(id)
            //console.log(data)
            res.render('admin/editUser', { d: data });
        } catch (error) {
            console.log(error)
        }
    }
    static updateUser = async (req, res) => {
        try {
            const id = req.params.id;
            const { n, e, p } = req.body
            // console.log(id)
            const data = await UserModuls.findByIdAndUpdate(id, {
                name: n,
                email: e,
                password: p
            })
            res.redirect("/admin/StudentDisplay") //route

        } catch (error) {
            console.log(error)
        }
    }
    static deleteUser = async (req, res) => {
        try {
            const id = req.params.id;
            const { n, e, p } = req.body
            // console.log(id)
            const data = await UserModuls.findByIdAndDelete(id)
            res.redirect("/admin/StudentDisplay") //route

        } catch (error) {
            console.log(error)
        }
    }
    static userInsert =async(req,res)=>{
        try{
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

}
module.exports = AdminController