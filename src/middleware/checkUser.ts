import { and, eq, or } from "drizzle-orm";
import { db } from "../models";
import { users } from "../models/schema/users";
import { NextFunction,Response,Request } from "express";
import { selectUserSchema } from "../models/validations/users";

export async function checkUser(req:Request,res:Response,next:NextFunction) {
        const result = selectUserSchema.safeParse(req.body)
        if(!result.success){
            res.status(400).json({errors:result.error.issues})
            return
        }
        const {email,username} = result.data
        const data = await db.query.users.findFirst({
            where: and(
                eq(users.username,username),
                eq(users.email,email)
            ),
            with:{
                socials:true,
                userRoles:{
                    columns:{
                        assigned_at:true,
                        roleCode:true,
                        expires_at:true
                    }
                }
            }
        })

        req.existingUser = data
        
        next()
}