export interface Post {
    id:number;
    title:string;
    body:string;
    created_at:number,
    published_at:number|null,
    author:string,
    is_published:boolean,
}

export const posts: Post[]=[];