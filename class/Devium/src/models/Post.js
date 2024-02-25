const { default: mongoose } = require("mongoose");
const { default: slugify } = require("slugify");
const { number } = require("zod");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    slug: {
      type: String,
      unique: true,
    },
    reactionCount:{
      type:Number,
      default:0,
    },
  },
  {
    timestamps: true,
  }
);

postsSchema.pre("save", function (next) {
  this.slug = `${slugify(this.title)}-${Date.now()}`
  next();
});

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;
