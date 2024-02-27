const dotenv =require('dotenv');
const connectToDb = require('../utils/db');
const createAdmin = require('./user-seeder');
const createPosts = require('./post-seeder');

dotenv.config()

const runSeeder = async()=>{
    await connectToDb()
    // await createAdmin()
    await createPosts()

}

runSeeder()
.then(()=>{
    console.log("success: seeder ran successfully")
    process.exit(0)
})
.catch((err)=>{
    console.error("success: seeder failed to run",err)
    process.exit(1)
})