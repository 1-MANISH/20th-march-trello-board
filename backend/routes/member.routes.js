import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { addMemberToOrganizationController, deleteMemberFromOrganizationController, getAllowMemberLists } from "../controllers/member.controller.js"

const memberRoutes = express.Router()



memberRoutes.post('/add-member-to-organization/:organizationId',authMiddleware,addMemberToOrganizationController)

memberRoutes.delete('/delete-member-from-organization',authMiddleware,deleteMemberFromOrganizationController)

memberRoutes.get('/allow-member-lists/:organizationId',authMiddleware,getAllowMemberLists)

export default memberRoutes