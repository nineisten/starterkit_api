import {integer,pgTable,varchar,serial,uuid,text,timestamp,primaryKey,numeric} from "drizzle-orm/pg-core"
import { roles } from "./roles"
import { relations } from "drizzle-orm"

export const subscriptions = pgTable('subscriptions',{
    id:serial('id').primaryKey(),
    label:varchar('label',{length:100}).notNull().unique(),
    description:text('description').notNull(),
    price:numeric('price',{precision:10,scale:2}).notNull().default('0.00'),
    billingPeriod:varchar('billing_period',{length:50}).notNull(),
})

export const features = pgTable('features',{
    id:serial('id').primaryKey(),
    label: varchar('label',{length:100}).notNull().unique(),
    description: text('description').notNull()
})

export const subscriptionFeatures = pgTable('subscription_features',{
    featureId:integer('feature_id').notNull().references(()=>features.id,{onDelete:'cascade'}),
    subscriptionId:integer('subscription_id').notNull().references(()=>subscriptions.id,{onDelete:'cascade'})
},(t)=>[
    primaryKey({name:'subFeat_pk',columns:[t.featureId,t.subscriptionId]})
])

//create role junction
export const subscriptionRoles = pgTable('subscription_roles',{
    subscriptionId: integer('subscription_id').notNull().references(()=>subscriptions.id,{onDelete:'cascade'}),
    roleId: integer('role_id').notNull().references(()=>roles.id,{onDelete:'cascade'})
},(t)=>[
    primaryKey({name:'subRole_pk',columns:[t.roleId,t.subscriptionId]})
])

//create subscripton relations schema
export const subscriptionRelations = relations(subscriptions,({one,many})=>({
    role:one(subscriptionRoles,{
        fields:[subscriptions.id],
        references:[subscriptionRoles.subscriptionId]
    }),
    features:many(subscriptionFeatures),
}))

export const featureRelations = relations(features,({many})=>({
    subscriptions:many(subscriptions)
}))

export const subscriptionFeatureRelations = relations(subscriptionFeatures,({one})=>({
    subscription:one(subscriptions,{
        fields:[subscriptionFeatures.subscriptionId],
        references:[subscriptions.id]
    }),
    features:one(features,{
        fields:[subscriptionFeatures.featureId],
        references:[features.id]
    })
}))

