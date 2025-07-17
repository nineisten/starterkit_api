import { relations } from "drizzle-orm"
import {integer,pgTable,varchar,serial,uuid,text,timestamp,primaryKey} from "drizzle-orm/pg-core"
import { categories } from "./categories"
import { tags } from "./tags"
import { users } from "./users"

//blog post 
export const posts = pgTable('posts',{
    id:serial('id').primaryKey(),
    title:varchar('title',{length:100}).notNull(),
    body:text('body').notNull(),
    featuredImg:text('featured_img'),
    created_at:timestamp('created_at').defaultNow().notNull(),
    published_at:timestamp('published_at'),
    updated_at:timestamp('updated_at')
})
//apply authors to post
export const postAuthors = pgTable('post_authors',{
    postId:integer('post_id').references(()=>posts.id,{onDelete:'cascade'}),
    userId: uuid('user_id').references(()=>users.id,{onDelete:'cascade'}),
},(t)=>[
    primaryKey({name:'post_author_pk',columns:[t.postId,t.userId]})
])

//apply categories to post
export const postCategories = pgTable('post_categories',{
    postId: integer('post_id').notNull().references(()=>posts.id,{onDelete:'cascade'}),
    categoryId: integer('category_id').notNull().references(()=>categories.id,{onDelete:'cascade'})
},
(t)=>[
    primaryKey({name:'postCat_pk',columns:[t.postId,t.categoryId]})
    ]
)
//apply tags to post
export const postTags = pgTable('post_tags',{
    postId:integer('post_id').notNull().references(()=>posts.id,{onDelete:'cascade'}),
    tagId: integer('tag_id').notNull().references(()=>tags.id,{onDelete:'cascade'})
},(t)=>[
    primaryKey({name:'postTags_pk',columns:[t.tagId,t.postId]})
])

// begin relations
export const postRelations = relations(posts,({many})=>({
    categories:many(categories),
    tags:many(tags),
    authors:many(postAuthors)
}))
export const postAuthorRelations = relations(postAuthors,({many})=>({
    posts:many(posts)
}))
export const postCategoryRelations = relations(postCategories,({one})=>({
    post:one(posts,{
        fields:[postCategories.postId],
        references:[posts.id]
    }),
    category:one(categories,{
        fields:[postCategories.categoryId],
        references:[categories.id]
    }),

}))

