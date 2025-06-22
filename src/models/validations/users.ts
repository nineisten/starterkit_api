import { nullable } from "zod/v4";
import {  
    validateEmail, 
    validateId, 
    validateName, 
    validateSocials, 
    validateUrl, 
    validateUsername, 
    validateUUID 
} from "./util";
import {z} from "zod"

//validate user insert schema schema
export const insertUserSchema = z.object({
    // id:validateUUID,
    name:validateName,
    username:validateUsername,
    email:validateEmail
})

export const insertSocialsSchema = z.object({
    id:validateId,
    userId:validateUUID,
    platform:validateUrl,
    handle:validateSocials
})

export const insertUserRolesSchema = z.object({
    userId:validateUUID,
    roleId:validateId,
})

export type  createUser = z.infer<typeof insertUserSchema>;
export type  insertSocials = z.infer<typeof insertSocialsSchema>;
export type  insertUserRoles = z.infer<typeof insertUserRolesSchema>;

///begin select user schemas
export const selectUserSchema=z.object({

    username:validateUsername,
    email:validateEmail
})

export const selectSocialsSchema = z.object({
    userId:validateUUID,
    socialId:validateId
})

export const selectUserRolesSchema = z.object({
    userId:validateUUID,
    roleId:validateId
})

export type getUser = z.infer<typeof selectUserSchema>
export type getUserSocials = z.infer<typeof selectSocialsSchema>
export type getUserRoles = z.infer<typeof selectUserRolesSchema>

// update user schema

export const updateUserSchema = z.object({
    id:validateUUID,
    name:validateName,
    username:validateUsername,
    email:validateEmail
})

export const updateSocialsSchema = z.object({
    
})

export const updateRolesSchema = z.object({
    userId:validateUUID,
    roleId:validateId,
})

