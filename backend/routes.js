import { Router } from "express";
import { postDB } from "./controller/postController.js";
import { getAllUsers } from "./controller/getUsers.js";

const userRoute  = Router();
userRoute.post('/', postDB)
userRoute.get('/', getAllUsers)

export default userRoute