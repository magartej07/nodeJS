const Post = require("../models/Post")
const {faker} = require("@faker-js/faker")


// npm run db:se
//for fake data faker.js
const createPosts=async()=>{
    for(i=0;i<=100; i++){
        const post = new Post({
            thumbnail:"uploads/1708928514229-1000000001-try.jpeg",
            title: faker.lorem.lines(1),
            content:faker.lorem.lines(10),
            userId:"65d707a1f1e15233f1a7b068",
            categoryId:"65dc05651a1b7a3f9de01fde",
            status:"published",
        })
        await post.save()
        console.log(`Post Created: ${post.title}`)
    }
}

module.exports = createPosts