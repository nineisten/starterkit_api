import { relations } from "drizzle-orm"
import {integer,pgTable,varchar,serial,uuid,text,timestamp,primaryKey} from "drizzle-orm/pg-core"


export const categories = pgTable('categories',{
    id:serial('id').primaryKey().unique(),
    label:varchar('label',{length:50}).notNull().unique(),
    desc:varchar('description',{length:150})
})

export const catTree = pgTable('category_tree',{
    parentCategoryId:integer('parent_category_id').notNull().references(()=>categories.id,{onDelete:'cascade'}),
    childCategoryId:integer('child_category_id').notNull().references(()=>categories.id),
},(t)=>[
    primaryKey({name:"category_tree_pk",columns:[t.childCategoryId,t.parentCategoryId]})
])


//start relations
export const categoryRelations = relations(categories,({many})=>({
    parents:many(catTree,{relationName:'child_to_parent'}),
    children:many(catTree,{relationName:'parent_to_child'})
}))

export const catTreeRelations = relations(catTree,({one})=>({
    parent:one(categories,{
        fields:[catTree.parentCategoryId],
        references:[categories.id],
        relationName:'child_to_parent'
    }),
    child:one(categories,{
        fields:[catTree.childCategoryId],
        references:[categories.id],
        relationName:'parent_to_child'
    })
}));