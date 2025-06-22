import {integer,pgTable,varchar,serial,uuid,text,timestamp} from "drizzle-orm/pg-core"

export const tags = pgTable('tags',{
    id:serial('id').primaryKey().notNull(),
    label:varchar('label',{length:50}).notNull().unique(),
    desc:varchar('description',{length:150})
})

