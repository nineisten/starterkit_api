import { NextFunction,Request,Response} from "express";
import { insertUserSchema, selectUserSchema,selectUserByUsernameSchema, getUserRoles} from "../../models/validations/users";
import { db } from "../../models";
import { users } from "../../models/schema/users";
import { eq, or ,asc,desc,SQL, sql, and} from "drizzle-orm";
import { roles } from "../../models/schema";
import { userRoles } from "../../models/schema/users";
import { updateUserRole } from "../../models/validations/users";



export async function createUser (req:Request,res:Response,next:NextFunction){
    try {
        const result  = insertUserSchema.safeParse(req.body)

        //user details availability validation
        if(!result.success){
            res.status(400).json({errors:result.error.issues})
            return
        }else if (req.existingUser){
            res.status(400).json({message:"Unable to add user. please try again"})
            return
        }

        ///check for user role before commiting new user registration
        const getRole = await db.select().from(roles).where(eq(roles.name,'user'))
        if (getRole.length === 0){
            res.status(404).json({message:'user role not found'})
            return
        }
        //register new user
        const {name,username,email}= result.data;
        const newUser = await db
            .insert(users)
            .values({name,username,email})
            .returning()
        
        //assign user role for all new registrations
        const roleResult = await assignUserRoles(newUser[0].id,getRole[0].code)
        if(!roleResult?.success){
            await db.delete(users).where(eq(users.id,newUser[0].id))
            res.status(400).json({message:'Unable to create User account please try again later'})
            return
        }
        const userData = await db.query.users.findFirst({
            where:eq(users.id,newUser[0].id),
            with:{
                socials:true,
                userRoles:true
            }
        })
        res.status(201).json(userData)
    } catch (error) {
        next(error)
    }
}
//query a list of users (username only)
export async function assignUserRoles(userId:string,roleCode:number){
    try {
        if(!userId || !roleCode){
            return {success:false}
        }
        const assignedRole =  await db
            .insert(userRoles)
            .values({userId,roleCode})
            .returning()

        if(!assignedRole[0]){
            return {success:false}
        }
        return {success:true,assignedRole}
    } catch (error) {
        
    }
}

export async function getUsers(req:Request,res:Response,next:NextFunction){
    try {
        const {limit,offset,sort} = req.body
        const userList = await db.query.users.findMany({
            limit,
            offset,
            columns:{
                name:true,
                username:true
            },
            with:{
                userRoles:true
            },
            orderBy:sort === 'asc'? 
                asc(users.username):
                desc(users.username)
        })
        if (userList.length === 0){
            res.status(404).json({message:'No users exist.'})
            return
        }
        res.status(201).json(userList)
    } catch (error) {
        next(error)
    }
}

//get individual users based on their username
export async function getUserByUsername(req:Request,res:Response,next:NextFunction){
    try {
        const result = selectUserByUsernameSchema.safeParse(req.params)
        if(!result.success){
            res.status(400).json({error:result.error.issues})
            return
        }
        const {username} = result.data
        
        const user = await db.query.users.findFirst({
            where:eq(users.username,username),
            columns:{
                name:true,
                username:true},
            with:{
                socials:true,
                userRoles:{
                    columns:{
                        roleCode:true,
                        expires_at:true,
                    }
                }
            }
        })
        if (!user){
            res.status(404).json({message:'User not found'})
            return
        }
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

/// update all userr details
export async function updateUser(req:Request,res:Response,next:NextFunction){
    try {
        const {username,email,roleList,socials} = req.body
        // console.log(!req.existingUser)
        if(!req.existingUser){
            res.status(404).json({message:'user not found'})
            return
        }
        ///update user roles
        const userId = req.existingUser.id
        const message:object[] = []
        const existingRoles = req.existingUser.userRoles
        console.log(existingRoles)
        const updatedUserRoles:getUserRoles[] = []
        if(roleList){
            roleList.map(async (r:updateUserRole)=>{
                //check if role exists on user
                const role = await db.query.roles.findFirst({
                    columns:{code:true},
                    where:eq(roles.name,r.name)
                })
                if (!role){
                    message.push({role:'role doesn\'t exist.'})
                    res.status(404).json({message:'role doesn\'t exist.'})
                    return
                }
                const checkRolesOnUser = existingRoles.find(rl=>rl.roleCode === role.code)
                if (checkRolesOnUser && !r.deleteRole){
                    res.status(400).json({message:'role exists on user'})
                    return
                }
                if (checkRolesOnUser && r.deleteRole ){
                    const deletedRole = await db.delete(userRoles)
                    .where(
                        and(
                            eq(userRoles.userId,userId),
                            eq(userRoles.roleCode,role.code)
                        )
                    ).returning()
                    console.log('role deleted',deletedRole)
                    return
                }else if (!checkRolesOnUser && r.deleteRole){
                    res.status(404).json({message: r.name +' Does not exist on user'})
                    return
                }
                const updatedRoles = await db.insert(userRoles)
                .values({
                    roleCode:role.code,
                    userId,
                    expires_at:r.expires_at,
                    updated_at:sql`NOW()`
                })
                .returning()
                if(updatedRoles){
                    updatedUserRoles.push(updatedRoles[0])
                }
                console.log(updatedUserRoles)
                
            })
        }
        // if(socials){
        // }
        console.log(message)

    } catch (error) {
        next(error)
    }
}


export async function updateUserRoles(){
    try {
        
    } catch (error) {
        return{error}
    }
}

export async function updateUserSocials(){
    try {
        
    } catch (error) {
        return{error}
    }
}
// export async function updateUser(req:Request,res:Response, next:NextFunction){
//     try {
//         const {name,username,email} = req.body
//         const {handle,platform} = req.body
//         const userResults = req.body
//         if(!userResults.success){
//             return
//         }
//         const roleResults = req.body
//         if(!roleResults.success){
//             res.status(404).json(roleResults.errors)
//             return
//         }
//         const {role,deleteRole,expires_at} = roleResults.data

//         //check for existing user (middleware)
//         if (!req.existingUser){
//             res.status(404).json({message:'User not found'})
//             return
//         }
        
//         //cycle through role names and apply to userRoles
        
//         const userDetails = req.existingUser
//         const userId = userDetails.userRoles[1].userId

//         const roleMap = role.map((r:string)=>{
//             for(let role of userDetails.userRoles){
//                 updateRoles(r,false,userId,role.roleCode,null)
//             }
//         })
//         const roleDetails = await db.query.roles.findFirst({
//             where:eq(roles.name,role)
//         })
        
//         if (!roleDetails){
//             res.status(404).json({message:'role not found'})
//             return
//         }
//         const checkRole = userDetails.userRoles.find((u)=>u.roleCode === roleDetails.code)
//         if(!checkRole && deleteRole){
//             res.status(400).json({message:'Role does not exist on profile'})
//             return
//         }else if(checkRole){
            
//         }

//         const updatedUser = await db.update(users)
//             .set({name,username,email,updated_at:sql`NOW()`})
//             .where(eq(users.name,userDetails.name))

//         console.log(updatedUser)
//     } catch (error) {
//         next(error)   
//     }

// }

// //
// export async function updateRoles (role:string,deleteRole:boolean,userId:string,roleCode:number,exp:Date|null){
//     try {
//         const roleDetails = await db.query.roles.findFirst({
//             where:eq(roles.name,role)
//         })
//         if(!roleDetails){
//             return {message:'role not found'}
//         }
//         if(roleDetails.code === roleCode && !deleteRole){
//             return {message:'role already exists on user'}
//         }else if(roleDetails.code === roleCode && deleteRole){
//             const deletedRole = await db.delete(userRoles)
//                 .where(and(
//                     eq(userRoles.roleCode,roleCode),
//                     eq(userRoles.userId,userId)))
//             return {message:'role has been deleted ',deletedRole}
//         }
//         const updatedUserRoles = await db.insert(userRoles)
//             .values({userId,roleCode,expires_at:exp})
//         return {updatedUserRoles}

//     } catch (error) {
//         return{error}
//     }
// }

export async function deleteUser(req:Request,res:Response,next:NextFunction){
    try {
        // const {username,email} = req.body
        if (!req.existingUser){
            res.status(404).json({message:'User not found'})
            return
        }
        const id = req.existingUser.id
        const deletedUser = await db.delete(users).where(eq(users.id,id)).returning()

        if(deletedUser[0]){
            res.status(201).json({message:`${deletedUser} has been succesfully removed`})
        }
    } catch (error) {
        next(error)
    }
}