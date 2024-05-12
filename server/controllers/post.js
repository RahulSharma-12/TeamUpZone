import {Post} from '../models/Post.js'
import { User } from '../models/User.js';

const createPost = async (req,res)=>{
    try{

        // check
          
      

    //    const newPostData
    // const {title , content , requirement , numOfPeopleRequired, createdAt } = req.body;
      
    const newPostData  = {
        title :req.body.title,
        content : req.body.content,
         requirement  : req.body.requirement,
        numOfPeopleRequired: req.body.numOfPeopleRequired,
        author :req.user._id,
          
      
      
       
    }; 
   


 
       const post  = await Post.create(newPostData); 
       const user = await User.findById(req.user._id);
    
       

       if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        });
    }

       user.posts.push(post._id);
       console.log(post._id);
       await user.save();

       res.status(200).json({
        success:true,
        message:"Post created",
        data : newPostData,
        // post : newPostData,
       });
    } catch (error){
        res.status(500).json({
            success:false,
            message : error.message 
        });
    }

}
// delete post 
 const deletePost = async(req, res) =>{
     try {
        const post = await Post.findById(req.params.id);

        if (!post) {
          return res.status(404).json({
            success: false,
            message: "Post not found",
          });
        }
    
        if (post.author.toString() !== req.user._id.toString()) {
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
        }


        await post.deleteOne();

        const user = await User.findById(req.user._id);
    
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);
    
        await user.save();
    
        res.status(200).json({
          success: true,
          message: "Post deleted",
        });

     } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          });
     }
 }
// likes and unlikes post

const likeAndUnlikePost = async (req, res ) =>{

   try {

    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }
  
      if (post.likes.includes(req.user._id)) {
        const index = post.likes.indexOf(req.user._id);
  
        post.likes.splice(index, 1);
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Post Unliked",
        });
      } else {
        post.likes.push(req.user._id);
  
        await post.save();
  
        return res.status(200).json({
          success: true,
          message: "Post Liked",
        });
      }
    
   } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      }); 
   }
     

}

// get all post
const getAllPost = async (req,res) =>{
    try {
        
  const post = await Post.find().populate('author', 'title');
    return res.json({
        success: true,
        data : post,
    })
   
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
          }); 
    }
}

const updatePost =  async(req,res) =>{
    try {
        
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
              });
        }
        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({
              success: false,
              message: "Unauthorized",
            });
          }
          post.title = req.body.title;
          post.content= req.body.content;
          post.requirement  = req.body.requirement;
          post.numOfPeopleRequired =  req.body.numOfPeopleRequired;
          await post.save();
         res.status(200).json({
         success: true,
          message: "Post updated",
    });
           
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}




export {createPost , likeAndUnlikePost, deletePost, getAllPost, updatePost } ;