import { NextFunction,Request,Response} from "express";
import { insertUserSchema } from "../../models/validations/users";
import { db } from "../../models";
import { users } from "../../models/schema/users";
import { DatabaseError } from "pg";


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
//query a list of users
export async function getUserByUsername(req:Request,res:Response,next:NextFunction){
    
}
export async function getUsers(req:Request,res:Response,next:NextFunction){
    
}
export async function updateUser(req:Request,res:Response, next:NextFunction){

}