import { BoardModel } from "../models/board.model.js"
import { IssueModel } from "../models/issues.model.js"
import { OrganizationModel } from "../models/organizations.model.js"
import { MESSAGES, STATUS_CODE } from "../utils/constants.js"
import { sendError, sendSuccess } from "../utils/response.js"

async function createIssueController(req,res,_next){
        try {
               const {title,description} = req.body
               const {organizationId,boardId} = req.query
               const user = req.user
               
               if(!title || !description  || !organizationId || !boardId){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
               }

               const organization =await OrganizationModel.findOne({_id:organizationId})

               if(!organization){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ORGANIZATION_NOT_FOUND)
                        return
               }

               const isAllowed= organization.admin.toString()===user.id || organization.members.includes(user.id)
               if(!isAllowed){
                        sendError(res,STATUS_CODE.FORBIDDEN,MESSAGES.CAN_PERFORM_ACTION)
                        return
               }

               const board = await BoardModel.findOne({_id:boardId})

               if(!board){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.BOARD_NOT_FOUND)
                        return
               }

               const newIssue= await IssueModel.create({
                         title,
                        description,
                        boardId:board._id,
                        state:"next_up"
               })

               sendSuccess(res,STATUS_CODE.CREATED,{issue:newIssue},MESSAGES.CREATE_ISSUE_SUCCESS)
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}
async function getBoardIssuesController(req,res,_next){
        try {
              
               const {boardId} = req.params
               const user = req.user
               
               if( !boardId){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
               }


               const board =await BoardModel.findOne({_id:boardId})
               const organization = await OrganizationModel.findOne({_id:board.organizationId})

               if(!board){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.BOARD_NOT_FOUND)
                        return
               }
               if(!organization){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ORGANIZATION_NOT_FOUND)
               }

               const isAllowed= organization.admin.toString()===user.id || organization.members.includes(user.id) 
               if(!isAllowed){
                        sendError(res,STATUS_CODE.FORBIDDEN,MESSAGES.CAN_PERFORM_ACTION)
                        return
               }


               const issues = (await IssueModel.find({boardId:board._id}).lean()).map(issue=>{
                        return {
                                id:issue._id,
                                title:issue.title,
                                description:issue.description,
                                state:issue.state,
              
                        }
               })

               sendSuccess(res,STATUS_CODE.CREATED,{issues},MESSAGES.CREATE_ISSUE_SUCCESS)
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        }
}

async function updateIssueStateController(req,res,_next){
       try {
               const {status} = req.body
               const {issueId} = req.query
               const user = req.user
               
               if(!status ||   !issueId){
                        sendError(res,STATUS_CODE.BAD_REQUEST,MESSAGES.MISSING_FIELDS)
                        return
               }

               const issue = await IssueModel.findOne({_id:issueId})
               if(!issue){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ISSUE_NOT_FOUND)
                        return
               }

                const board = await BoardModel.findOne({_id:issue.boardId})
                 if(!board){
                        sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.BOARD_NOT_FOUND)
                        return
               }
               const organization = await OrganizationModel.findOne({_id:board.organizationId}) 

               if(!organization){
                          sendError(res,STATUS_CODE.NOT_FOUND,MESSAGES.ORGANIZATION_NOT_FOUND)
               }

               const isAllowed= organization.admin.toString()===user.id || organization.members.includes(user.id)
               if(!isAllowed){
                        sendError(res,STATUS_CODE.FORBIDDEN,MESSAGES.CAN_PERFORM_ACTION)
                        return
               }

              
        //        const updateIssue= {
        //                 id:issue.id,
        //                 title:issue.title,
        //                 description:issue.description,
        //                 boardId:board.id,
        //                 state:status
        //        }

                const updateIssue = await  IssueModel.updateOne(
                        {_id:issue._id},
                        {
                                state:status
                        }
                )

               sendSuccess(res,STATUS_CODE.OK,{updateIssue},MESSAGES.UPDATE_ISSUE_SUCCESS)
        } catch (error) {
                sendError(res,STATUS_CODE.SERVER_ERROR,error?.message)
        } 
}


export {
        createIssueController,
        getBoardIssuesController,
        updateIssueStateController
}