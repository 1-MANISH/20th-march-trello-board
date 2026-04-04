import { BoardModel } from "../models/board.model.js"
import { OrganizationModel } from "../models/organizations.model.js"
import { UserModel } from "../models/user.model.js"
import { MESSAGES, STATUS_CODE } from "../utils/constants.js"
import { sendError, sendSuccess } from "../utils/response.js"

async function createOrganizationController(req,res,_next){
        try {
                const user = req.user
                const {name,description} = req.body

                if(!name || !description){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
                }

                const newOrganization = await OrganizationModel.create({
                        name,
                        description,
                        admin:user.id,
                        members:[]
                })

                sendSuccess(res,STATUS_CODE.CREATED,{organization:newOrganization},MESSAGES.ORGANIZATION_CREATED)


        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

async function getAllOrganizationsController(req,res,_next){
        try {
                const user  = req.user

                const organizations = await OrganizationModel.find({
                       $or:[
                        {admin:user.id},
                        { members:{$in:[user.id]}}
                       ]
                }).lean()

                const detailedOrganizations = organizations.map(organization=>{
                        return{
                                ...organization,
                                id:organization._id,
                                admin:req.user
                        }
                })
                sendSuccess(res,STATUS_CODE.OK,{organizations:detailedOrganizations},MESSAGES.ORGANIZATIONS_FETCHED)
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}
async function getOrganizationController(req,res,_next){
        try {
                const {organizationId} = req.params
                const user  = req.user


                const organization = await OrganizationModel.findOne({
                       $and:[
                                {_id:organizationId},
                               {
                                 $or:[
                                       { members:{$in:[user.id] }},
                                        {admin:user.id}
                                 ]
                               }
                       ]
                }).lean()

                if(!organization){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ORGANIZATION_NOT_FOUND)
                        return
                }
                const members = []
                for(let i = 0 ;i < organization.members.length;i++){
                         const user = await UserModel.findOne({_id:organization.members[i]})
                         members.push({
                                id:user._id,
                                username:user.username,
                        })
                }
                const detailedOrganization = {...organization,id:organization._id,admin:req.user,members}

        
                const boards = await BoardModel.find({organizationId:organizationId}).lean()
                detailedOrganization.boards = boards
                sendSuccess(res,STATUS_CODE.OK,{organization:detailedOrganization},MESSAGES.ORGANIZATIONS_FETCHED)

        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

export {
        createOrganizationController,
        getAllOrganizationsController,
        getOrganizationController
}