const mongoose=require('mongoose');
const mongoConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(console.log("connect"))
    .catch(err=>{console.log(err)})

}
module.exports=mongoConnection;

