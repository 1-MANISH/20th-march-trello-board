import { OrganizationModel } from "../models/organizations.model.js"
import { UserModel } from "../models/user.model.js"
import { MESSAGES, STATUS_CODE } from "../utils/constants.js"
import { sendError, sendSuccess } from "../utils/response.js"

async function addMemberToOrganizationController(req,res,_next){
        try {
                const {organizationId} = req.params
                const {memberId} = req.body
                const user = req.user

                if(!memberId || !organizationId){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
                }

                const organization = await OrganizationModel.findOne({_id:organizationId})

                if(!organization){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ORGANIZATION_NOT_FOUND)
                        return
                }

                const isAdmin = organization.admin.toString()===user.id

                if(!isAdmin){
                        sendError(res,STATUS_CODE.FORBIDDEN,MESSAGES.ADMIN_CAN_PERFORM_ACTION)
                        return
                }

                const member  = await UserModel.findOne({_id:memberId})

                if(!member){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.INVALID_MEMBER_ID)
                        return
                }

                await OrganizationModel.updateOne(
                        {_id:organization._id},
                        {
                                $push:{members:member._id}
                        }
                )

                sendSuccess(res,STATUS_CODE.OK,{},MESSAGES.MEMBER_ADDED_TO_ORGANIZATION)

        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}
async function deleteMemberFromOrganizationController(req,res,_next){
        try {

                const {organizationId,memberId} = req.query
                const user = req.user

                 if(!memberId || !organizationId){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
                }

              
                const organization = await OrganizationModel.findOne({_id:organizationId}).lean()
                if(!organization){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ORGANIZATION_NOT_FOUND)
                        return
                }

                 const isAdmin = organization.admin.toString()===user.id
                if(!isAdmin){
                        sendError(res,STATUS_CODE.FORBIDDEN,MESSAGES.ADMIN_CAN_PERFORM_ACTION)
                        return
                }


                // const member  = store.users.find(user=>user.id===Number(memberId))
                const member  =await UserModel.findOne({_id:memberId})

                if(!member){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.INVALID_MEMBER_ID)
                        return
                }

                organization.members = organization.members.filter(memberId1=>memberId1.toString() !== memberId)

                await OrganizationModel.updateOne(
                        {_id:organization._id},
                        {
                                members:organization.members
                        }
                )

                sendSuccess(res,STATUS_CODE.OK,{},MESSAGES.MEMBER_DELETED_FROM_ORGANIZATION)

                
        } catch (error) {
                 sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

async function getAllowMemberLists(req,res,_next){
        try {
                const {organizationId} = req.params

                if( !organizationId){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
                }

                const organization = await OrganizationModel.findOne({_id:organizationId})
                if(!organization){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ORGANIZATION_NOT_FOUND)
                        return
                }

                const members  = organization.members

                let allowedMembers = await UserModel.find({
                        _id:{$nin:members}
                }).lean()

                allowedMembers =allowedMembers.map(mem=>({
                        id:mem._id,
                        username:mem.username
                }))
                sendSuccess(res,STATUS_CODE.OK,{allowedMembers},MESSAGES.MEMBER_ADDED_TO_ORGANIZATION)

        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

export {
        addMemberToOrganizationController,
        deleteMemberFromOrganizationController,
        getAllowMemberLists
}