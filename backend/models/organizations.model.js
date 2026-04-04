import mongoose from "mongoose"

const organizationSchema = new mongoose.Schema({
        name:{
                type:String,
                required:true
        },
        description:{
                type:String,
                required:true
        },
        admin:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
        },
        members:[
                {
                        type:mongoose.Schema.Types.ObjectId,
                        ref:'User',
                        required:true
                }
        ]
},{
        timestamps:true
})

export const OrganizationModel = mongoose.model('Organization',organizationSchema)