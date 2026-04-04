import mongoose from "mongoose"

const issuesSchema = new mongoose.Schema({
        title:{
                type:String,
                required:true
        },
        description:{
                type:String,
                required:true
        },
        boardId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Board',
                required:true
        },
        state:{
                type:String,
                require:true,
                enum:["next_up","in_progress","done"]
        }

},{
        timestamps:true
})

export const IssueModel = mongoose.model('Issue',issuesSchema)