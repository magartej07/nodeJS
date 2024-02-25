const { z } = require("zod");

const verifyUserSchema = z.object({
    token: z
    .string({
        required_error:"Token is required",
    })
    .length(6,{
        message:"Token must be 6 characters long"
    }),
})

module.exports = verifyUserSchema