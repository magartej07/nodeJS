const Reaction = require("../models/Reaction");
const Post = require("../models/Post");
const ApiError = require("../utils/ApiError");
const statusCode = require("../utils/statusCode");
const Category = require("../models/categories");

const createPost = async (data) => {
  const category = await Category.findById(data.categoryId);
  if (category.verifiedAt === null) {
    throw new ApiError(statusCode.BAD_REQUEST, "Category not found");
  }
  const newPost = new Post({ ...data });
  await newPost.save();
  return newPost.toObject();
};

// const verifyPost = async(id)=>{
//     const post = await Post.findById(id);
//     if (!post){
//         throw new ApiError(statusCode.NOT_FOUND,"Post not found")
//     }
//     if(post.verifiedAt){
//         throw new ApiError(statusCode.BAD_REQUEST,"Post already verified")
//     }
//     post.verifiedAt = new Date()
//     await post.save()
//     return post.toObject()
// }

const deletePost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(statusCode.NOT_FOUND, "Post not found");
  }
  if (post.userId !== userId) {
    throw new ApiError(
      statusCode.FORBIDDEN,
      "You are not allowed to delete this post"
    );
  }
  await post.deleteOne();
  return post.toObject();
};

const updatePost = async (id, userId, data) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(statusCode.NOT_FOUND, "Post not found");
  }
  if (post.userId !== userId) {
    throw new ApiError(
      statusCode.FORBIDDEN,
      "You are not allowed to update this post"
    );
  }
  post.set(data);

  try {
    await post.save();
  } catch (err) {
    throw new ApiError(statusCode.BAD_REQUEST, "Post slug already in used");
  }
  return post.toObject();
};

const getPost = async (id) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(statusCode.NOT_FOUND, "Post not found");
  }
  return post.toObject();
};

const getAllPosts = async ({
  page = 1,
  perPage = 10,
  sortBy = "createdAt",
  q,
  status = "published",
}) => {
  const posts = await Post.find({
    title: {
      $text: {
        $search: q,
      },
    },
    status: status,
  })
    .sort({
      [sortBy]: -1,
    })
    .limit(perPage)
    .skip(perPage * (page - 1));
  return posts;
};

const reactOnPost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(statusCode.NOT_FOUND, "Post not found");
  }
  const reaction = new Reaction({
    postId: id,
    userId: userId,
  });
  await reaction.save();
  post.reactionCount += 1;
  await post.save();
  return post.toObject();
};

const unReactOnPost = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(statusCode.NOT_FOUND, "Post not found");
  }
  await Reaction.findOneAndDelete({
    postId: id,
    userId: userId,
  });
  post.reactionCount -= 1;
  await post.save();
  return post.toObject();
};

const getPostReactions = async (id) => {
  const reactions = await Reaction.find({
    postId: id,
  });
  return reactions;
};

//   const isCurrentUserReacted = async (id, userId) => {

//     const reaction = new Reaction.findOne({
//       postId: id,
//       userId: userId,
//     });
//     await reaction.save();
//     post.reactionCount += 1;
//     await post.save();
//     return post.toObject();
//   };

module.exports = {
  createPost,
  // verifyPost,
  deletePost,
  updatePost,
  getAllPosts,
  getPost,
  reactOnPost,
  unReactOnPost,
  getPostReactions,
  // getAllUnverifiedCategories,
};
