import { sql } from "drizzle-orm"
import {integer,pgTable,varchar,serial,uuid,text,timestamp,primaryKey} from "drizzle-orm/pg-core"
// import { users } from "./users"

//Role definition
export const roles = pgTable('roles',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:50})
        .notNull()
        .unique(),
    description:text('description')
        .notNull(),
    code:integer('code')
        .notNull()
        .default(sql`floor(random() * 9000 + 1000::integer)`)
        .unique()
})

