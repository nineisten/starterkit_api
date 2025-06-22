import {z} from 'zod'

export interface UserPermissions{
    userId:string,
    role:string,
    code:number,
    assigned_at:Date,
    expires_at:Date|null
}

export const deleteUserPermissionsSchema = z.object({
    userId: z
        .string()
        .min(36,'Malformed User id. please check again and try again.'),
    roles: z
        .array(z.string())
})

export const UserPermissionsSchema = z.object({
    userId: z.string(),
    role: z
        .string()
        .min(3,'Role name is required'),
    code:z
        .number()
        .int()
        .min(4,'Role code must be a minimum of 4 digits')
        .positive('code must be a positive number'),
    expires_at: z
        .date()
        .nullable()
})
export const UserRolesSchema = z.object({
   roles:z.array(UserPermissionsSchema)
}) 
export const userPermissions: UserPermissions[] = []