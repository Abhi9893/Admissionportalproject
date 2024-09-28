const jwt = require('jsonwebtoken')
const UserModel = require('../moduls/user')
const { verifylogin } = require('../controllers/FrontController')

const checkAuth = async (req,res,next)=>{
    // console.log("hello abhi")
    const{token}=req.cookies
    // console.log(token)
    if(!token){
        req.flash('error','unauthorised user please login')
        res.redirect('/')
    }else{
        const verifyToken = jwt.verify(token,'dkjfc98adfsdbf878bch')
        // console.log(verifyToken)
        const data = await UserModel.findOne({_id:verifyToken.ID})
        // console.log(data)
        req.userData = data
        next()
    

    }
}

module.exports = checkAuth