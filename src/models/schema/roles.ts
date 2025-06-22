import {integer,pgTable,varchar,serial,uuid,text,timestamp,primaryKey} from "drizzle-orm/pg-core"
// import { users } from "./users"

//Role definition
export const roles = pgTable('roles',{
    id:serial('id').primaryKey(),
    role_name:varchar('role_name',{length:50}).notNull().unique(),
    description:text('description').notNull(),
    role_code:integer('role_code').notNull().unique()
})

