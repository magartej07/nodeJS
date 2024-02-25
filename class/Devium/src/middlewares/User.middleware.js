const { verifyJWT } = require("../services/auth-service")

const userAttachMiddleware = (req,res,next)=>{
    const authToken = req.headers.authorization
    console.log("attach", authToken)
    if(authToken){
        const token = authToken.split(" ")[1]
        if(token){
            const user = verifyJWT(token)
            if(user){
                req.user=user
                console.log(user, req.user)
            }
        }
    }
next()
}

module.exports = userAttachMiddleware