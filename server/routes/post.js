import express from "express";
import { addComment, createPost, deleteComment, deletePost, getAllPost, likeAndUnlikePost, updatePost } from "../controllers/post.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();
 
 
//  router.route();
// app.use(isAuthenticated);
//  app.post("/post/upload",createPost);
 app.post("/post/upload",isAuthenticated,createPost);
 app.get("/post/:id",isAuthenticated,likeAndUnlikePost);
 app.put("/post/:id",isAuthenticated,updatePost);
 app.delete("/post/:id",isAuthenticated,deletePost);
 app.get("/post",getAllPost);
 app.put("/post/comment/:id",isAuthenticated,addComment);
 app.delete("/post/comment/delete/:id",isAuthenticated,deleteComment);

export default app; 