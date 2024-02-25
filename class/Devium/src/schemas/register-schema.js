const z = require("zod")//for validation

const registerSchema = z.object({
    name:z.string({
        required_error:"name is required",
    }),
    username:z.string({
        required_error:"username is required",
    }),
    // avatar:z.instanceof(file,{
    //     message:"avatar is required",
    // })
    // .nullable(),
    email:z.string({
        required_error:"email is required",
    })
    .email({
        message: "invalid email format"
    }),
    password:z.string({
        required_error:"password is required",
    })
    .min(6,{
        message: "password must be 6 character"
    })
})

module.exports = registerSchema