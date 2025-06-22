// import { Request,Response,NextFunction } from "express";
// import { Post,posts } from "../../models/blog/posts";

// //create post 
// export const createPost = (req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const {title,body,author,is_published} = req.body;    
//         const newPost: Post = {
//             id:Date.now(),
//             title,
//             body,
//             created_at:Date.now(),
//             is_published,
//             published_at:is_published?Date.now():null,
//             author
//         };
//         posts.push(newPost)
//         res.status(201).json(newPost)
//     }catch(error){
//         next(error)
//     }
// }

// //read all posts
// export const getPosts = (req:Request,res:Response,next:NextFunction)=>{
//     try{
//         res.json(posts);
//     }catch(error){
//         next(error)
//     }
// }

// //get a single post.
// export const getPostById = (req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const id = parseInt(req.params.id,10);
//         const post = posts.find((p)=>p.id === id)
//         if (!post){
//             res.status(404).json({message:'Post not found'})
//             return
//         }
//         res.json(post)
//     }catch(error){
//        next(error)
//     }
// }
// /// update post data
// export const updatePost =(req:Request,res:Response, next:NextFunction)=>{
//     try{
//         const id = parseInt(req.params.id,10);
//         const {slug,title,body,author,is_published} = req.body; 
//         const postIndex = posts.findIndex((p)=>p.id === id)
//         if (postIndex === -1){
//             res.status(404).json({message:"Post Not found"})
//             return
//         }
//         posts[postIndex].title = title
//         posts[postIndex].body = body
//         posts[postIndex].author = author
//         posts[postIndex].published_at = is_published?Date.now():null
//         res.json(posts[postIndex])
//     }catch(error){
//         next(error)
//     }
// }
// //remove post from list
// export const deletePost = (req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const id = parseInt(req.params.id,10)
//         const postIndex = posts.findIndex((p)=>p.id === id)
//         if(postIndex === -1){
//             res.status(404).json({message:"Post not found"})
//             return
//         }
//         const deletedItem = posts.splice(postIndex,1)[0]
//         res.json(deletedItem)
//     }catch(error){
//         next(error)
//     }
// }

