import { Router } from "express"
import { checkUser } from "../middleware/checkUser";
import { 
    createUser,
    getUsers,
    getUserByUsername,
    assignUserRoles,
    // updateUser,
    // deleteUser, 
    // appendUserRoles,
    // deleteUserRoles
} from "../controllers/users/userController"
import { createRoles } from "../controllers/users/rolesController";

const userRoutes = Router()

userRoutes.get('/',getUsers)
userRoutes.get('/:username',getUserByUsername)
userRoutes.post('/',checkUser,createUser)
userRoutes.post('/roles',assignUserRoles)
// userRoutes.put('/',updateUser)
// userRoutes.delete('/',deleteUser)
// userRoutes.put('/roles',appendUserRoles)
// userRoutes.delete('/roles',deleteUserRoles)
export default userRoutes;