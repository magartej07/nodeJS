const { default: mongoose } = require("mongoose");
const slugify = require("../utils/slugify");

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      default: null,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

categoriesSchema.pre("save",function(next){
  // this.slug = slugify(this.name)
  if(this.verifiedAt){
    this.slug = slugify(this.name)
  }
  else{
    this.slug = `${slugify(this.name)}-${Date.now()}`
  }
  next()
})

const Category = mongoose.model("Category", categoriesSchema);
module.exports = Category;
