const Category = require("../models/categories")
const ApiError = require("../utils/ApiError")
const statusCode = require("../utils/statusCode")

const createCategory = async ({name}) =>{
    const category = await Category.create({name,})
    return category.toObject()
}

const verifyCategory = async(id)=>{
    const category = await Category.findById(id);
    if (!category){
        throw new ApiError(statusCode.NOT_FOUND,"Category not found")
    }
    if(category.verifiedAt){
        throw new ApiError(statusCode.BAD_REQUEST,"Category already verified")
    }
    category.verifiedAt = new Date()
    await category.save()
    return category.toObject()
}

const deleteCategory = async(id)=>{
    const category = await Category.findById(id);
    if (!category){
        throw new ApiError(statusCode.NOT_FOUND,"Category not found")
    }
    await category.deleteOne()
    return category.toObject()
}

const updateCategory = async(id,{name, slug}) => {
    const category = await Category.findById(id);
    if (!category){
        throw new ApiError(statusCode.NOT_FOUND,"Category not found")
    }
    category.name=name
    category.slug=slug
    
    try{
        await category.save()
    }
    catch(err){
        throw new ApiError(statusCode.BAD_REQUEST,"Category slug already in used")
    }
    return category.toObject()
}

const getAllCategorry = async(id)=>{
    const categories = await Category.find({
        verifiedAt:{$ne:null},
    })
    return categories
}

const getAllUnverifiedCategories = async(id)=>{
    const categories = await Category.find({
        verifiedAt:null,
    })
    return categories
}

module.exports = {
    createCategory,
    verifyCategory,
    deleteCategory,
    updateCategory,
    getAllCategorry,
    getAllUnverifiedCategories,
}