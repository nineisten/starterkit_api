import { Request,Response,NextFunction } from "express";
import { roles } from "../../models/schema";
import { db } from "../../models";
import { and, eq } from "drizzle-orm";
import { insertRoleSchema } from "../../models/validations/roles";

export async function createRoles(req:Request,res:Response,next:NextFunction){
    try {
        const result = insertRoleSchema.safeParse(req.body)
        if (!result.success){
            res.status(400).json(result.error)
            return
        }
        const {name,description} = result.data
        const roleExists = await db.select()
            .from(roles)
            .where(eq(roles.name,name))
        if(roleExists[0]){
            console.log(roleExists)
            res.status(400).json({message:'Role already exists.',roleExists})
            return
        }
        const role = await db.insert(roles)
            .values({
                name,description
                })
            .returning()

        res.status(201).json(role)
    } catch (error) {
        next(error)
    }
}
