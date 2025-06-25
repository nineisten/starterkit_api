import {z} from 'zod'
import { validateCode, validateDescription, validateDescriptionRequired, validateName } from './util'

export const insertRoleSchema = z.object({
    name:validateName,
    description:validateDescriptionRequired
})
export type insertRole = z.infer<typeof insertRoleSchema>

export const selectRoleByCodeShema = z.object({
    code:validateCode
})
export const selectRoleByNameSchema = z.object({
    name:validateName
})
export type selectRoleByCode = z.infer<typeof selectRoleByCodeShema>
export type selectRoleByName = z.infer<typeof selectRoleByNameSchema>

export const updateRoleSchema = z.object({
    name:validateName,
    descriptions:validateDescription
})
export type updateRoleSchema = z.infer<typeof updateRoleSchema>

