import express from "express"
import { getMyProfileController, loginController, logoutController, signupController } from "../controllers/user.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const authRoutes = express.Router()

authRoutes.post('/signup',signupController)

authRoutes.post('/login',loginController)

authRoutes.get('/logout',authMiddleware,logoutController)

authRoutes.get('/me',authMiddleware,getMyProfileController)

export default authRoutes