const z = require("zod");

const categorieSchema = z.object({
  name: z.string({
    required_error: "Name is reuired",
  }),
});


module.exports = categorieSchema
