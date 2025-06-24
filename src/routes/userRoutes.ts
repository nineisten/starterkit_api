import { Router } from "express"
import { checkUser } from "../middleware/checkUser";
import { 
    createUser,
    getUsers,
    getUserByUsername,
    // updateUser,
    // deleteUser, 
    // appendUserRoles,
    // deleteUserRoles
} from "../controllers/users/userController"

const userRoutes = Router()

userRoutes.get('/',getUsers)
userRoutes.get('/:username',getUserByUsername)
userRoutes.post('/',checkUser,createUser)
// userRoutes.put('/',updateUser)
// userRoutes.delete('/',deleteUser)
// userRoutes.put('/roles',appendUserRoles)
// userRoutes.delete('/roles',deleteUserRoles)
export default userRoutes;