import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { createIssueController,getBoardIssuesController, updateIssueStateController } from "../controllers/issue.controller.js"

const issueRoutes = express.Router()

issueRoutes.post('/create',authMiddleware,createIssueController)
issueRoutes.get('/:boardId',authMiddleware,getBoardIssuesController)
issueRoutes.put('/update-status',authMiddleware,updateIssueStateController)

export default issueRoutes