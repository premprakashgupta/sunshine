const ProductSchema=require('../models/ProductSchema');
const ApiFeatures = require('../utiles/apifeatures');

exports.allProduct= async (req,res)=>{
    // const token = req.cookies.token;
    // console.log("token "+token)
    try {
        const resultPerPage=4;
        const productCount= await ProductSchema.find().count();
        const apiFeature=new ApiFeatures(ProductSchema.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage)
        const data= await apiFeature.query;
        
        res.status(200).json({
            data:data,
            resultPerPage:resultPerPage,
            productCount:productCount
        })
        
        
    } catch (error) {
        console.log(error)
    }
}
exports.productCreate= async (req,res)=>{
    try {
        const data= await ProductSchema.create(
            req.body
        )
        res.status(200).json(data)
        console.log(data);
        
    } catch (error) {
       console.log(error) 
    }
}
exports.productUpdate= async (req,res)=>{
    try {
        const data= await ProductSchema.findByIdAndUpdate(req.body.id,req.body,{new:true})
        res.status(200).json(data)
        console.log(data);
        
    } catch (error) {
        console.log(error)
    }
}
exports.productDelete= async (req,res)=>{
    try {
        const data= await ProductSchema.findByIdAndDelete(req.body.id)
        res.status(200).json(data)
        console.log(data);
        
    } catch (error) {
        console.log(error)
    }
}

exports.ProductDetail= async (req,res)=>{

    try {
        const data= await ProductSchema.findById(req.params.id);
        res.status(200).json(data)
        // console.log(req.userAllData.id);
        
    } catch (error) {
        res.status(200).json({
            error: error.value
        })
    }
}

// cart related function ----------------------------------------------------------


exports.addReview= async (req,res)=>{
    const review={
        userId:req.body.userId,user:req.body.user,comment:req.body.comment,star:req.body.star
    }
    try {
        let indicator=false;
        const data= await ProductSchema.findById(req.params.id)
        
        data.reviews.forEach((item)=>
        {
            if(item.userId===req.body.userId){
                item.comment=req.body.comment;
                item.star=req.body.star;
                indicator=true;
            }
            
        }
        
         )
         if(!indicator)
         {
            data.reviews.push(review)
         }

        
        data.save()
        res.status(200).json("review added")
        
        
    } catch (error) {
       console.log(error) 
    }
   
}