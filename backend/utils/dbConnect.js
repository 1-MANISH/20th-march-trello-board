import mongoose from "mongoose"
import { ENV } from "./env.js"
export const connectDB = async () => {
        try {
                const mongoURI = ENV.MONGO_URI
                if(!mongoURI){
                        throw new Error('MONGO_URI is not defined !')
                }
                const connection  = await mongoose.connect(mongoURI,{dbName:"Trello"})
                console.log(`MongoDB connected : ${connection.connection.host}`)
        } catch (error) {
                console.log(`Error connecting to mongodb : ${error.message}`)
                process.exit(1)
        }
}