const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");

const UserSchema=new mongoose.Schema({
    pic:{
        type: String,
        default:"/image/avatar.jpg"
    },
    username:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        default: "member"
    },
    password:{
        type: String,
        required:true,
        select: false
    },
    cart:[{
        name: {
            type: String,
            
        },
        productId:{
            type: String,
        },
        pic:{
            type: String,
            default:"no image"
        },
        price:{
            type: Number,
            default: 0
        },
        quantity: {
            type: Number,
            default: 1
        },
    }],
    msg:[{
        comment: {
            type: String,
            
        }
    }],
},{timestamps: true}

)

// Jwt TOKEN -------------------------------------------------------------

UserSchema.methods.getJwtToken =function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPAIRE
    })
}

module.exports=mongoose.model('User',UserSchema)