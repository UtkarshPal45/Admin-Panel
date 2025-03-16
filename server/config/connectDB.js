import mongoose from "mongoose"

const connectDB = async(req,res)=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("DB connected succesfully!")
    } catch (error) {
        console.log("DB connection failed! ", error)
    }
}

export default connectDB