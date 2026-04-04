import mongoose from "mongoose"

const boardSchema = new mongoose.Schema({
        title:{
                type:String,
                required:true
        },
        organizationId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Organization',
                required:true
        },

},{
        timestamps:true
})

export const BoardModel = mongoose.model('Board',boardSchema)