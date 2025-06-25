import {integer,pgTable,varchar,serial,uuid,text,timestamp,primaryKey} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"
import { roles} from "./roles"

//create user table with basic user information
export const users = pgTable("users",{
    id:uuid('id').primaryKey().defaultRandom(),
    name:text('name').notNull(),
    email:varchar('email',{length:100}).notNull().unique(),
    username: varchar('username',{length:24}).notNull().unique(),
    created_at:timestamp('created_at').defaultNow().notNull(),
    updated_at:timestamp('updated_at').defaultNow().notNull()
})
//add a socials table for social media accounts
export const socials = pgTable('socials',{
    id:serial('id').primaryKey(),
    userId:uuid('user_id').notNull().references(()=>users.id,{onDelete:'cascade'}),
    platform:varchar('platform',{length:50}),
    handle:varchar('handle',{length:24}),
})
//junction table to connect user roles to user 
export const userRoles = pgTable('user_roles',{
    // id:serial('id').primaryKey(),
    userId:uuid('user_id').notNull().references(()=>users.id,{onDelete:'cascade'}),
    roleId:integer('role_id').notNull().references(()=>roles.id,{onDelete:'cascade'}),
    assigned_at: timestamp('assigned_at').notNull().defaultNow(),
    expires_at: timestamp('expires_at').notNull().defaultNow(),
    updated_at:timestamp('updated_at').notNull().defaultNow()
},(t)=>[
    primaryKey({name:"pk_userRoles",columns:[t.roleId,t.userId]})
    ]
)
///start relations
export const userRelations = relations(users,({many})=>({
    socials: many(socials),
    userRoles:many(userRoles)
}))

export const socialsRelations = relations(socials,({one})=>({
    user: one(users,{
        fields:[socials.userId],
        references:[users.id]})
}))

export const userRoleRelations = relations(userRoles,({one})=>({
    user: one(users,{
        fields:[userRoles.userId],
        references:[users.id]
    }),
    role: one(roles,{
        fields:[userRoles.roleId],
        references:[roles.id]
    })
}))