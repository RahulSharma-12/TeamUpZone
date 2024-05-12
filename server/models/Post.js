import mongoose, { model } from "mongoose";

const postSchema = new mongoose.Schema({


  author: {
    type: mongoose.Schema.ObjectId,
    // type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true
  },

    title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    
      numOfPeopleRequired: {
        type: Number,
        required: true,
      },
      link: {
        type: String,
        required: false,
      },
      requirement: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      // acceptedUsers: [
      //   {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: 'User' // Reference to the User model
      //   }
      // ],

    //     caption :String,
    //      imageUrl:{
    //      public_id:String,
    //  },
     likes:[
     {
            
          type : mongoose.Schema.Types.ObjectId,
          ref:'User',
            
     },
    ],
    comments:[
        {
               users:{
             type : mongoose.Schema.Types.ObjectId,
             ref:'User',
               },
               comments : {
                type : String,
                required:false, 
            },
        },
       ],
     

})


// module.exports = mongoose.model("Post", postSchema);
export const Post = mongoose.models.Post || model("Post", postSchema);
