const { hash } = require("argon2")
const User = require("../models/user")

const createAdmin = async()=>{
    const admin = new User({
        name:"Devium Admin",
        email: "admin@devium.com",
        password:await hash("ashik123"),
        role:"admin",
        username:"admin",
        avatar: "no-images"
    })
    await admin.save()
}

module.exports= createAdmin