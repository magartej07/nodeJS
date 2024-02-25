const jwt = require("jsonwebtoken")
const secret = 'mySecret'

const injectUser = (req,res,next)=>{
    const token = req.headers?.authorization?.replace("Bearer ","")
    if (token){
        const user = jwt.verify(token, secret)
        if(user){
            req.user =user
            next()
        }
    }next()
}

module.exports =injectUser;