import { NextFunction,Request,Response} from "express";
import { insertUserSchema, selectUserSchema,selectUserByUsernameSchema} from "../../models/validations/users";
import { db } from "../../models";
import { users } from "../../models/schema/users";
import { eq, or ,asc,desc,SQL} from "drizzle-orm";
import { roles } from "../../models/schema";
import { userRoles } from "../../models/schema/users";



export async function createUser (req:Request,res:Response,next:NextFunction){
    try {
        const result  = insertUserSchema.safeParse(req.body)

        if(!result.success){
            res.status(400).json({errors:result.error.issues})
            return
        }else if (req.userExists){
            res.status(400).json({message:"Unable to add user. please try again"})
            return
        }
        const {name,username,email}= result.data;
        const newUser = await db
            .insert(users)
            .values({name,username,email})
            .returning()
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}
//query a list of users (username only)
export async function assignUserRoles(req:Request,res:Response,next:NextFunction){
    try {
        const {roleName,userId} = req.body
        const userRole = await db.select()
            .from(roles)
            .where(eq(roles.name,roleName))
        if(!userRole[0]){
            res.status(404).json({message:"User Role not found"})
            return
        }
        const roleId = userRole[0].id
        const assignedRole = await db
            .insert(userRoles)
            .values({userId,roleId})
            .returning()

        res.status(201).json({message:"role has been assigned", assignedRole})

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
        const user = await db.select().from(users).where(eq(users.username,username));
        if (user.length <= 0){
            res.status(404).json({message:'User not found'})
            return
        }
        res.status(201).json(user[0])
    } catch (error) {
        next(error)
    }
}

export async function updateUser(req:Request,res:Response, next:NextFunction){

}