const argon2 = require("argon2")
const user = require("../Models/User")
const createUser = async(userData)=>{
    try{
        const hashedPassword = await hashPassword(userData.password)
        const user = new user({
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
            username: userData.username,
            avatar: userData.avatar,
        })
        await user.save()
        return user.toObject()
    }
    catch(error){
        console.error("error", error.message);
    }
}