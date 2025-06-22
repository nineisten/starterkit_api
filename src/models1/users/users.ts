import { UUID } from "crypto";
import {z}from "zod"
import { UserPermissionsSchema } from "./userPermissions";


export interface User {
    id:UUID|string,
    name:string,
    email:string,
    username:string,
    socials:string[],
    created_at:Date,
}

export const newUserValidationSchema = z.object({
    name: z
        .string()
        .min(2,'Name is required')
        .regex(/^[A-Za-z\s]+$/,'Name must contain only alphabetic character'),
    username: z
        .string()
        .min(3,'Username is required')
        .max(24,'Username can not exceed 24 characters')
        .regex(/^[a-z0-9_-]+$/,'Username must only contain lowercase letters, numbers, underscore or hyphen characters'
        ),
    email: z
        .string()
        .email('invalid email format'),
    socials: z
        .array(z
            .string()
            .min(1,'Social handle can not be empty')
            .regex(/^[a-zA-Z0-9._/-]+$/, 'Each social handle must contain only letters, numbers, periods, underscores, hyphens, or forward slashes'))
        .optional(),
})
export const UserProfileValidation = z.object({
    username: z
        .string()
        .min(3,'Username is required')
        .max(24,'Username can not exceed 24 characters')
        .regex(/^[a-z0-9_-]+$/,'Username must only contain lowercase letters, numbers, underscore or hyphen characters'
        ),
    })
//add validation for inputs
export const UserValidationSchema = z.object({
    // id:z.string(),
    userId:z
        .string()
        .min(36,'User Id must be a valid uuid'),
    name: z
        .string()
        .min(2,'Name is required')
        .regex(/^[A-Za-z\s]+$/,'Name must contain only alphabetic character'),
    username: z
        .string()
        .min(3,'Username is required')
        .max(24,'Username can not exceed 24 characters')
        .regex(/^[a-z0-9_-]+$/,'Username must only contain lowercase letters, numbers, underscore or hyphen characters'
        ),
        
    email: z
        .string()
        .email('invalid email format'),
    socials: z
        .array(z
            .string()
            .min(1,'Social handle can not be empty')
            .regex(/^[a-zA-Z0-9._/-]+$/, 'Each social handle must contain only letters, numbers, periods, underscores, hyphens, or forward slashes'))
        .optional(),
})

export const DeleteUserValidation= z.object({
    userId:z.string().min(36,'Malformed UUID please check id and try again.')
})

export const users: User[] = [];

