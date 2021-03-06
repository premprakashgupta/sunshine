const express=require('express');
const app=express();
const bodyParser = require('body-parser')
const cookieParse=require('cookie-parser')
const cors=require('cors');

if(process.env.NODE_ENV!=='production')
{
    require('dotenv').config({path:"config/config.env"});
    
}
const mongoConnection=require('./mongoConnection/mongoConnection');
const ProductRoute=require('./routes/ProductRoute')
const UserRoute=require('./routes/UserRoute')
const path=require('path')
// db connection ---------------------------------------------------
mongoConnection();
// db connection ---------------------------------------------------

app.use(cookieParse())

app.use(cors());





app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use("/api/ppg",ProductRoute)
app.use("/api/ppg",UserRoute)

app.use(express.static(path.join(__dirname,'../sunshine/build')))
app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../sunshine/build/index.html'))
})














app.listen(process.env.PORT || 4000,()=>{
    console.log("Listen on port sunshineprem")
})