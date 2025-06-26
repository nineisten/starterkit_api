import {z} from 'zod'
import { 
    validateCode, 
    validateDescription, 
    validateDescriptionRequired, 
    validateName,
    validateCodeNullable,
    validateNameNullable 
} from './util'

export const insertRoleSchema = z.object({
    name:validateName,
    description:validateDescriptionRequired
})
export type insertRole = z.infer<typeof insertRoleSchema>

export const selectRoleSchema = z.object({
    // code:validateCode,
    name:validateName
})

export type selectRoleBy = z.infer<typeof selectRoleSchema>

export const updateRoleSchema = z.object({
    name:validateName,
    descriptions:validateDescription
})
export type updateRoleSchema = z.infer<typeof updateRoleSchema>

