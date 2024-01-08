import { Router } from "express";
import LoginController from "./auth.controller.js";

export const authRoutes = Router()
    .get('/login',LoginController.getAll)
    .post('/sign-up',LoginController.signUp)
    .post('/sign-in',LoginController.signIn)
    .patch('/login',LoginController.updateUser)
    