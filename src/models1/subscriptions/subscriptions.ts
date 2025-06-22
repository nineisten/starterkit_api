export interface Subcription{
    id:string,
    title:string,
    description:string,
    price:number,
    features: string[],
    billingPeriod:number[],
    created_at:Date,
    updated_at:Date
}

export const subscriptions: Subcription[]=[]