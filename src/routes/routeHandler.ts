import { Router } from "express";
import postRoutes from "./postRoutes";
import userRoutes from "./userRoutes";
import { utilRoutes } from "./utilityRoutes";

const router = Router()

//
router.use('/posts',postRoutes)
router.use('/users',userRoutes)
router.use('/util',utilRoutes)

export default router;