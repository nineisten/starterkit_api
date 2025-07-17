import { Request,Response,NextFunction } from "express";
import { roles } from "../../models/schema";
import { db } from "../../models";
import { and, eq, or } from "drizzle-orm";
import { insertRoleSchema, selectRoleSchema } from "../../models/validations/roles";


///create user roles for different permission levels
/// each role has an ID, Name, Description, and Code.
/// when user data is included in a request it is sent with the codes instead of the role names.
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

///return a list of roles & codes

export async function getRoles(req:Request,res:Response,next:NextFunction){
    try {
        const existingRoles = await db.query.roles.findMany()
        if (existingRoles.length === 0){
            res.status(404).json({message:'No roles exist'})
            return
        }
        res.status(201).json(existingRoles)
    } catch (error) {
        next(error)
    }
}
//get the individual role based on the url params 
export async function getRole(req:Request,res:Response,next:NextFunction){
  try {
        const result = selectRoleSchema.safeParse(req.params)
        if(!result.success){
            res.status(400).json(result.error)
            return
        }
        const {name} = result.data
        const selectedRole = await db.select()
            .from(roles)
            .where(eq(roles.name,name))
        if (!selectedRole[0]){
            res.status(404).json({message:'Role doesnt exist'})
        }
        res.status(201).json(selectedRole)
  } catch (error) {
        next(error)
  }
}

//remove selected roles by name.
export async function deleteRoles(req:Request,res:Response,next:NextFunction){
    try {
        const result = selectRoleSchema.safeParse(req.body)
        if(!result.success){
            res.status(400).json(result.error)
            return
        }
        const {name} = result.data
        const roleExists = await db.select().from(roles).where(eq(roles.name,name))
        if (!roleExists[0]){
            res.status(404).json({message:'Role doe not exist'})
            return
        }
        const deleteRole = await db.delete(roles)
            .where(
                or(
                    eq(roles.name,name)
                )
            ).returning()
        res.status(201).json({message:'role has been deleted ',deleteRole})
        
    } catch (error) {
        next(error)   
    }
}