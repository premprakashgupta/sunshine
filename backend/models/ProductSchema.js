const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    pic:{
        type: String,
        default:""
    },
    name:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        default:"You will get best product from here,We care about your health and wealth both.."
    },
    stock:{
        type: Number,
        default: 0
    },
    rate:{
        type: Number,
        default:0
    },
    star:{
        type:Number,
        default: 5
    },
    category:{
        type: String,
        default:"laptop"
    },
    reviews:[{

        userId: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        star: {
            type: Number,
            default: 0
        },
    }],
},{timestamps: true}

)

module.exports=mongoose.model('product',ProductSchema)