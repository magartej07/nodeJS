const { z } = require("zod");
const categorieSchema = require("./categories-schema");

const updateCategorySchema = categorieSchema.extend({
    slug:z.string({
        required_error:"slug is required",
    })
})

module.exports = updateCategorySchema