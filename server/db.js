import mongoose from "mongoose";

export const connectdb = () => {
    try {
        mongoose.connect(process.env.MONGOURL)
        console.log("Connected to DB!")
    } catch (error) {
        console.log("Error connecting to the Database:",error)
    }
}