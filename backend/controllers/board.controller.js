import { BoardModel } from "../models/board.model.js"
import { OrganizationModel } from "../models/organizations.model.js"
import { MESSAGES, STATUS_CODE } from "../utils/constants.js"
import { sendError, sendSuccess } from "../utils/response.js"

async function createBoardController(req,res,_next){
        try {
               const {title} = req.body
               const {organizationId} = req.query
               const user = req.user
               
               if(!title || !organizationId){
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

               const newBoard = await BoardModel.create({
                        title,
                        organizationId:organization.id
               })


               sendSuccess(res,STATUS_CODE.CREATED,{board:newBoard},MESSAGES.BOARD_CREATED)
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}


export {
        createBoardController
}