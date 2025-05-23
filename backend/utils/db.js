import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MongoURI);
        console.log(`MongoDB Connected successfully`);
    }catch(err){
        throw err;
    }
}

export default connectDB;