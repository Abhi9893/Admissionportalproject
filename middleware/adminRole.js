const jwt = require('jsonwebtoken')

const authRoles = (roles) =>{
    //console.log(roles)
    return(req,res,next)=>{
        console.log(req.userData.role)
        if (!roles.includes(req.userData.role)){ //role db wala
            req.flash('error','unauthorised user please login')
            res.redirect('/')
        }
        next()
    }
}
module.exports = authRoles