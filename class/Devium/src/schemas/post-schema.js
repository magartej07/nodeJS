const z = require("zod");

const postSchema = z.object({
  title: z.string({
    required_error: "Title is reuired",
  }),
  content: z.string({
    required_error: "content is reuired",
  }),
  categoryId: z.string({
    required_error: "Category is reuired",
  }),
  status: z.enum(["draft","published"],{
    required_error: "Status is reuired",
    invalid_type_error: "Status must be either 'draft' or 'published'",
  }),
});


module.exports = postSchema
