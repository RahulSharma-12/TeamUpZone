import mongoose from "mongoose";


const connectDB =(uri)=>{
    mongoose.connect(uri, {dbName:"TeamUpZone"}).then((data) =>
 console.log(`Connected to DB: ${data.connection.host}`))
.catch((err) =>{
    throw err;
});
};

export {connectDB};