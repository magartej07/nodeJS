const z = require("zod")//for validation

const loginSchema = z.object({
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

module.exports = loginSchema