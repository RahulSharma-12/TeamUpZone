import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt"

 import jwt from "jsonwebtoken";
 import crypto from "crypto";
const userSchema = new mongoose.Schema({

   name:{
    type:String,
    required:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
     required : true,
     select:false,
     minlength: [6, "Password must be atleast 6 character"]
    
   },
   
  posts: [
    {
    //   type: mongoose.Schema.Types.ObjectId,
    type : mongoose.Schema.ObjectId, 
      ref: "Post",
    },
  ],
   avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
   

//   followers: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],

//   following: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,

},


 
{
    timestamps: true,
  },
);

userSchema.pre("save", async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function(password){
     return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateToken = function (){
   return jwt.sign({_id:this._id},process.env.JWT_SECRET);
};


userSchema.methods.getResetPasswordToken = function (){
   const resetToken = crypto.randomBytes(20).toString("hex");

   console.log(resetToken);
   this.resetPasswordToken = crypto
   .createHash("sha256")
   .update(resetToken)
   .digest("hex");
 this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

 return resetToken;

}
// module.exports = mongoose.model("User", userSchema);
export const User = mongoose.models.User || model("User",userSchema);