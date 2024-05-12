import express from "express";
import { deleteMyProfile, getMyPost, getUserPosts, getUserProfile, login, logout, register, updatePassword, updateProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { getAllPost } from "../controllers/post.js";
// import { createPost } from "../controllers/post.js";

const app = express.Router();
 
 
//  router.route();
//  app.post("/post/upload",createPost)
app.post("/register",register);
app.post("/login",login);
app.get("/logout",logout);
app.put("/update/password",isAuthenticated,updatePassword);
app.put("/update/profile",isAuthenticated,updateProfile);
app.delete("/delete/profile",isAuthenticated,deleteMyProfile);
app.get("/my/posts" , isAuthenticated,getMyPost);
app.get("/userposts/:id" , isAuthenticated,getUserPosts);
app.get("/users/:id",isAuthenticated,getUserProfile)
app.get("/users/:id", isAuthenticated,getAllPost);
export default app;