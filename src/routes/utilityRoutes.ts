import { Router } from "express";
import { createRoles, deleteRoles, getRole, getRoles } from "../controllers/users/rolesController";



export const utilRoutes = Router()


utilRoutes.post('/roles',createRoles)
utilRoutes.get('/roles',getRoles)
utilRoutes.delete('/roles',deleteRoles)
utilRoutes.get('/roles/:name',getRole)

